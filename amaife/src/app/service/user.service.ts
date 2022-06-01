import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../model/user/Users";
import {ForgotPassword} from "../model/user/ForgotPassword";
import {AccountSinup} from "../model/user/AccountSinup";
import {ERole} from "../model/user/ERole";
import {Oder} from "../model/order/Oder";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * URL phía ADmin
   */
  readonly URL_USER = "http://localhost:8080/api/admin/user/findByRole"
  readonly URL_USER_SEARCH = "http://localhost:8080/api/admin/user/search"
  readonly URL_FindById = "http://localhost:8080/api/admin/user"
  readonly API_USER_Pass = "http://localhost:8080/api/users"

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  public findByIdUser(id: string): Observable<Users> {
    return this.httpClient.get<Users>(this.URL_FindById + "/" + id);
  }

  public findAllByAccount_Role(role: string): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(this.URL_USER + "/" + role);
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

  searchUserCustomer(fullName: string, userName: string, phone: string, email: string, address: string): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(this.URL_USER_SEARCH,
      {params: new HttpParams().set('fullName', fullName).set('userName', userName).set('phone', phone).set('email', email).set('address', address)});
  }
}
