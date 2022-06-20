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
  readonly URL_CHATCACCEL = "http://localhost:8080/api/chat/cancel"
  readonly URL_CHATDELETE = "http://localhost:8080/api/chat/delete"
  readonly URL_FINDBYID = "http://localhost:8080/api/chat/findbyid"

  constructor(private httpClient: HttpClient) {
  }

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  chatbot(chat: Chat): Observable<Chat> {
    return this.httpClient.post<Chat>(this.URL_CHATBOX, chat);
  }

  test(msg: string): Observable<String> {
    return this.httpClient.get<String>(this.URL_TEST, {
      params: new HttpParams().set('msg', msg),
    });
  }

  findUserName(createBy: string): Observable<Array<Chat>> {
    return this.httpClient.get<Array<Chat>>(this.URL_FINDCREATEBY + "/" + createBy);
  }


  updateChat(chat: Object): Observable<Chat> {
    return this.httpClient.put<Chat>(this.URL_CHATCACCEL, chat);
  }

  deleteByIdChat(id: number): Observable<Chat> {
    return this.httpClient.delete<Chat>(this.URL_CHATDELETE + "/" + id);
  }

  findbyid(id: number): Observable<Chat> {
    return this.httpClient.get<Chat>(this.URL_FINDBYID + "/" + id);
  }
}
