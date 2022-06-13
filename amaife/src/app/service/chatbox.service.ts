import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatboxService {

  readonly URL_CHATBOX = "http://127.0.0.1:5000/send"

  constructor(private httpClient: HttpClient) {
  }

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  chatbox(msg: string): Observable<string> {
    return this.httpClient.get<string>(this.URL_CHATBOX + "/" + msg, {headers: this.requestHeader});
  }
}
