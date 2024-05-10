import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CommentsType} from "../../types/comments.type";
import {CommentActionType} from "../../types/comment-action.type";
import {DefaultResponseType} from "../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(offset: number, id: string):Observable<CommentsType>{
    return this.http.get<CommentsType>(environment.api + 'comments?offset=' + offset + '&article=' + id)
  }

  addComments(text: string, article: string):Observable<DefaultResponseType>{
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text,
      article
    })
  }

  appliedAction(action: string, comment: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + comment + '/apply-action', {
      action: action
    })
  }

  getActions(comment: string): Observable<CommentActionType> {
    return this.http.get<CommentActionType>(environment.api + 'comments/' + comment + '/actions')
  }

  getArticleActions(article: string): Observable<CommentActionType[]>{
    return this.http.get<CommentActionType[]>(environment.api + 'comments/article-comment-actions?articleId=' + article)
  }
}
