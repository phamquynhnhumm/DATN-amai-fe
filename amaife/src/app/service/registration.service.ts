import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registration} from "../model/class/Registration";
import {AccountSinup} from "../model/user/AccountSinup";
import {Account} from "../model/user/Account";
import {Users} from "../model/user/Users";
import {EStatuasHandle} from "../model/class/EStatuasHandle";
import {ForgotPassword} from "../model/user/ForgotPassword";
import {NewPassword} from "../model/user/NewPassword";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  readonly URL_CLASS_STATUS = "http://localhost:8080/api/admin/class/status";
  readonly URL_CLASS_ADMIN = "http://localhost:8080/api/admin/class";
  readonly URL_CLASS_ADMIN_SEARCH = "http://localhost:8080/api/admin/class/search";
  readonly URL_CLASS_ADMIN_DELETE = "http://localhost:8080/api/admin/class/delete";
  readonly URL_CLASS_FINALLBYISDELETE = "http://localhost:8080/api/admin/class/all";

  readonly URL_CLASS = "http://localhost:8080/api/sinup/create";
  readonly API_USER_SINUP = "http://localhost:8080/api/sinup"
  readonly API_USER_LISTUSER = "http://localhost:8080/api/sinup/userlist"
  readonly API_USER_Pass = "http://localhost:8080/api/forgot"


  /**
   * Đăng ký nhận tư vấn ( tự chế biến món)
   * @param registration
   */
  createRegistration(registration: Object): Observable<Registration> {
    return this.httpClient.post<Registration>(this.URL_CLASS, registration, {headers: this.requestHeader});
  }

  /**
   * gửi mã OTP để Đăng ký tài khoản hoặc lấy lại mật khẩu
   * @param email
   */
  public generateOtpSinup(email: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.API_USER_SINUP + "/account/otpsotpsinup/" + email, {headers: this.requestHeader});
  }

  public generateOtpnewpassword(emailnew: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.API_USER_Pass + "/account/otpsotnewpassword/" + emailnew, {headers: this.requestHeader});
  }


  public newpassword(newPassword: NewPassword): Observable<Boolean> {
    return this.httpClient.post<Boolean>(this.API_USER_Pass + "/account/newpassword", newPassword, {headers: this.requestHeader});
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

  public finAllStatus(handle: EStatuasHandle): Observable<Array<Registration>> {
    return this.httpClient.get<Array<Registration>>(this.URL_CLASS_STATUS + "/" + handle);
  }

  public finByID(id: number): Observable<Registration> {
    return this.httpClient.get<Registration>(this.URL_CLASS_ADMIN + "/" + id);
  }

  public findALlBYIsDelete(isdelete: boolean): Observable<Array<Registration>> {
    return this.httpClient.get<Array<Registration>>(this.URL_CLASS_FINALLBYISDELETE + "/" + isdelete);
  }

  public updateRegistration(registration: Object): Observable<Registration> {
    return this.httpClient.put<Registration>(this.URL_CLASS_ADMIN, registration);
  }

  public deleteById(id: number): Observable<Registration> {
    return this.httpClient.delete<Registration>(this.URL_CLASS_ADMIN_DELETE + "/" + id);
  }

  public searchRegistration(isDelete: boolean, name: string, phone: string): Observable<Array<Registration>> {
    return this.httpClient.get<Array<Registration>>(this.URL_CLASS_ADMIN_SEARCH, {params: new HttpParams().set('isDelete', isDelete).set('name', name).set('phone', phone)});
  }

  /**
   * hiểnn thị all các user để nhằm xét tránh email trùng lăp
   */

  public finAllUser(): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(this.API_USER_LISTUSER, {headers: this.requestHeader});
  }
}
