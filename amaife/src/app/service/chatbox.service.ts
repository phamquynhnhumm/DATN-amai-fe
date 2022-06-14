import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chat} from "../model/chat/Chat";

@Injectable({
  providedIn: 'root'
})
export class ChatboxService {

  readonly URL_CHATBOX = "http://localhost:8080/api/chat/send"
  readonly URL_TEST = "http://localhost:8080/api/chat/test"
  readonly URL_FINDCREATEBY = "http://localhost:8080/api/chat"

  constructor(private httpClient: HttpClient) {
  }

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  chatbot(msg: string): Observable<string> {
    return this.httpClient.get<string>(this.URL_CHATBOX + "/" + msg);
  }

  test(msg: string): Observable<string> {
    return this.httpClient.get<string>(this.URL_TEST + "/" + msg);
  }

  findUserName(createBy: string): Observable<Array<Chat>> {
    return this.httpClient.get<Array<Chat>>(this.URL_FINDCREATEBY + "/" + createBy);
  }
}
