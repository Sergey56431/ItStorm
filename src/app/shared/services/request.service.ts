import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestType} from "../../types/request.type";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  order: boolean = true;
  constructor(private http: HttpClient) { }

  sendRequest(name: string, phone: string, type: string, service?: string): Observable<DefaultResponseType> {
    return this.http.post <DefaultResponseType>(environment.api + 'requests', {
      name,
      phone,
      service,
      type
    })
  }
}
