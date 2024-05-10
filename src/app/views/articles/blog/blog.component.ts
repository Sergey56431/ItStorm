import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../shared/services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../types/activeParams.type";
import {AllArticlesType} from "../../../types/all-articles.type";
import {CategoriesService} from "../../../shared/services/categories.service";
import {CategoryType} from "../../../types/category.type";
import {AppliedFilterType} from "../../../types/applied-filter.type";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  pages: number[] = [];
  articles!: AllArticlesType;
  sortingOpen: boolean = false;
  categories: CategoryType[] = [];
  appliedFilters: AppliedFilterType[] = [];
  activeCategory: boolean = false;

  activeParams: ActiveParamsType = {categories: []}

  constructor(private blogService: BlogService,
              private router: Router,
              private categoryService: CategoriesService,
              private activateRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.categories = data;

        this.activateRoute.queryParams
          .subscribe(params => {
            this.activeParams = ActiveParamsUtil.processParams(params);
            if (params['categories']) {
              this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']]
            }
            if (this.appliedFilters && this.appliedFilters.length > 0 && this.appliedFilters.some(category =>
              this.activeParams.categories.find(item => category.urlParam === item))) {
              this.activeCategory = true;
            }

            this.blogService.getArticles(this.activeParams)
              .subscribe(data => {
                this.articles = data;
                this.pages = []
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i)
                }
              })

            this.processArticles();
          })

        this.processArticles();
      })

  }

  updateParams(url: string) {
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryInParams = this.activeParams.categories.find(item => item === url);
      if (existingCategoryInParams) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
      } else if (!existingCategoryInParams) {
        this.activeParams.categories = [...this.activeParams.categories, url];
      }
    } else {
      this.activeParams.categories = [url];
    }

    this.activeParams.page = 1;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    })
  }

  toggleSorting() {
    this.sortingOpen = !this.sortingOpen;
  }

  processArticles() {
    this.categoryService.getCategories()

    this.activateRoute.queryParams
      .pipe(
        debounceTime(500)
      )
      .subscribe(params => {
        this.activeParams = ActiveParamsUtil.processParams(params)

        this.appliedFilters = [];

        this.activeParams.categories.forEach(url => {
          const foundCategory = this.categories.find(category => category.url === url)
          if (foundCategory) {
            this.appliedFilters.push({
              name: foundCategory.name,
              urlParam: foundCategory.url
            })
          }
        })
      })
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam);
    this.activeParams.page = 1;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    })
  }

  nextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
    }
  }

  prevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      console.log(this.activeParams.page)
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
    }
  }
}
