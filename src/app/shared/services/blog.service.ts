import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BestArticlesType} from "../../types/best-articles.type";
import {environment} from "../../../environments/environment";
import {ArticleType} from "../../types/article.type";
import {ActiveParamsType} from "../../types/activeParams.type";
import {AllArticlesType} from "../../types/all-articles.type";
import {BlogArticlesType} from "../../types/blog-articles.type";
import {CategoryType} from "../../types/category.type";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {
  }

  getBestArticles(): Observable<BestArticlesType[]> {
    return this.http.get<BestArticlesType[]>(environment.api + 'articles/top');
  }

  getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles/' + url);
  }

  getRecommendArticles(url: string): Observable<BestArticlesType[]> {
    return this.http.get<BestArticlesType[]>(environment.api + 'articles/related/' + url)
  }

  getArticles(params: ActiveParamsType): Observable<AllArticlesType> {
    return this.http.get<AllArticlesType>(environment.api + 'articles', {
      params: params
    })

    // .pipe(
    //   map((items: BlogArticlesType) => {
    //
    //     const articles: BlogArticlesType
    //
    //     articles.items.forEach(article => {
    //
    //       const foundArticle = article.url
    //
    //       articles.items.push({
    //         id: article.id,
    //         title: article.title,
    //         description: article.description,
    //         image: article.image,
    //         date: article.date,
    //         category: article.category,
    //         url: article.url
    //       })
    //       }
    //
    //     )
    //
    //     return articles;
    //   })
    // )
  }

  // getCategoryArticles(): Observable<CategoryType[]> {
  //   return this.http.get<>(environment.api + 'articles')
  //     .pipe(
  //       map((items: BlogArticlesType) => {
  //
  //         const articles: BlogArticlesType
  //
  //         articles.items.forEach(article => {
  //
  //             const foundArticle = article.url
  //
  //             articles.items.push({
  //               id: article.id,
  //               title: article.title,
  //               description: article.description,
  //               image: article.image,
  //               date: article.date,
  //               category: article.category,
  //               url: article.url
  //             })
  //           }
  //         )
  //
  //         return articles;
  //       })
  //     )
  // }
}
