import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../model/user/Users";
import {ForgotPassword} from "../model/user/ForgotPassword";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly URL_USER = "http://localhost:8080/api/admin/user"
  readonly API_USER_Pass = "http://localhost:8080/api/users"

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  public findByIdUser(id: string): Observable<Users> {
    return this.httpClient.get<Users>(this.URL_USER + "/" + id);
  }

  public updateUser(user: Users): Observable<any> {
    return this.httpClient.put(this.URL_USER, user);
  }

  public generateOtp(userName: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.API_USER_Pass + "/account/generate/" + userName);
  }

  public forgotPassword(forgotPassword: ForgotPassword): Observable<Boolean> {
    return this.httpClient.post<Boolean>(this.API_USER_Pass + "/account/forgot-password", forgotPassword);
  }

}
