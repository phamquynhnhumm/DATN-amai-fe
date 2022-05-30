import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registration} from "../model/class/Registration";
import {AccountSinup} from "../model/user/AccountSinup";
import {Account} from "../model/user/Account";
import {Users} from "../model/user/Users";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  readonly URL_CLASS = "http://localhost:8080/api/sinup/create";
  readonly API_USER_SINUP = "http://localhost:8080/api/sinup"


  /**
   * Đăng ký nhận tư vấn ( tự chế biến món)
   * @param registration
   */
  createRegistration(registration: Object): Observable<Registration> {
    return this.httpClient.post<Registration>(this.URL_CLASS, registration, {headers: this.requestHeader});
  }

  /**
   * gửi mã OTP để Đăng ký tài khoản
   * @param email
   */
  public generateOtpSinup(email: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.API_USER_SINUP + "/account/otpsotpsinup/" + email, {headers: this.requestHeader});
  }

  /**
   * Thực hiện thêm mới account
   * @param accountSinup
   * @constructor
   */
  public CreateaccountSinup(accountSinup: AccountSinup): Observable<Account> {
    return this.httpClient.post<Account>(this.API_USER_SINUP + "/account/register", accountSinup, {headers: this.requestHeader});
  }

  /**
   * Thêm mới đồng thời tài khoản user khi thêm account thành công
   * @param users
   * @constructor
   */
  public CreateUser(users: Users): Observable<Users> {
    return this.httpClient.post<Users>(this.API_USER_SINUP + "/user/create", users, {headers: this.requestHeader});
  }
}
