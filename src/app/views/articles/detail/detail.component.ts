import {Component, Input, OnInit} from '@angular/core';
import {BlogService} from "../../../shared/services/blog.service";
import {ActivatedRoute} from "@angular/router";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../../environments/environment";
import {BestArticlesType} from "../../../types/best-articles.type";
import {AuthServiceService} from "../../../core/auth/auth-service.service";
import {CommentsService} from "../../../shared/services/comments.service";
import {CommentsType} from "../../../types/comments.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {CommentActionType} from "../../../types/comment-action.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() myComment: string = '';
  article!: ArticleType;
  serverStaticPath = environment.serverStaticPath;
  recommend: BestArticlesType[] = [];
  isLogged: boolean = false;
  comments!: CommentsType
  actions: CommentActionType[] = [];
  url: string = '';
  offset: number = 3;


  constructor(private blogService: BlogService,
              private commentService: CommentsService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthServiceService,
              private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.url = params['url'];
      this.blogService.getArticle(params['url'])
        .subscribe((data: ArticleType) => {
          this.article = data;

          this.commentService.getArticleActions(data.id)
            .subscribe((comm: CommentActionType[]) => {
              this.actions = comm;
              this.getReaction()
            })
        });

      this.blogService.getRecommendArticles(params['url'])
        .subscribe((recommend: BestArticlesType[]) => {
          this.recommend = recommend;
        });
    });

    this.isLogged = this.authService.getIsLoggedIn();
  }

  addComment() {
    this.commentService.addComments(this.myComment, this.article.id)
      .subscribe((data: DefaultResponseType) => {
        this._snackBar.open(data.message);
        this.blogService.getArticle(this.url)
          .subscribe(article => {
            this.article = article
            this.getReaction()
          })
      })
  }

  getReaction() {
    this.article?.comments.forEach(item => {
      this.actions.forEach(comment => {
        if (item.id === comment.comment) {
          if (comment.action === 'like') {
            item.like = true;
            item.dislike = false;
          }
          else if (comment.action === 'dislike') {
            item.dislike = true;
            item.like = false;
          }
        }
      })
    })
  }

  loadMoreComments() {
    if (this.article.comments.length >= 10) {
      this.offset = this.article.comments.length
    }
    this.commentService.getComments(this.offset, this.article.id)
      .subscribe((data: CommentsType) => {
        this.article.comments = this.article.comments.concat(data.comments)
        this.getReaction();
      })
  }

  action(action: string, comment: string) {

    this.commentService.appliedAction(action, comment)
      .subscribe({
        next: data => {
          if (data && action === 'like' || action === 'dislike') {
            this._snackBar.open('Ваш голос учтён');
          }
          if (data && action === 'violate'){
            this._snackBar.open('Ваша жалоба отправлена');
          }
          this.commentService.getArticleActions(this.article.id)
            .subscribe(actions => {
              this.actions = actions
              this.getReaction()
            })
          this.blogService.getArticle(this.url)
            .subscribe(article => {
              this.article = article
              this.getReaction()
            })
        },

        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error){
            this._snackBar.open('Жалоба уже отправлена')
          }
        }
      })



  }


}
