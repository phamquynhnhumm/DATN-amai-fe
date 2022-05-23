import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../model/user/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly URL_USER = "http://localhost:8080/api/admin/user"
  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  public findByIdUser(id: string): Observable<Users> {
    return this.httpClient.get<Users>(this.URL_USER + "/" + id);
  }

  public updateUser(user: Users): Observable<any> {
    return this.httpClient.put(this.URL_USER , user);
  }
}
