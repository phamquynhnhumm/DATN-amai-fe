import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../model/user/Users";
import {ForgotPassword} from "../model/user/ForgotPassword";
import {AccountSinup} from "../model/user/AccountSinup";
import {Account} from "../model/user/Account";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * URL phía ADmin
   */
  readonly URL_USER = "https://salty-cove-09707.herokuapp.com/api/admin/user/findByRole"
  readonly URL_UN_USER = "https://salty-cove-09707.herokuapp.com/api/admin/user/undelete"
  readonly URL_USER_SEARCH = "https://salty-cove-09707.herokuapp.com/api/admin/user/search"
  readonly URL_FindById = "https://salty-cove-09707.herokuapp.com/api/admin/user"
  readonly API_USER_FINDALLNPOTEMAIL_ADMIN = "https://salty-cove-09707.herokuapp.com/api/admin/user/findallnotemail"
  readonly URL_FindById_DELETE = "https://salty-cove-09707.herokuapp.com/api/admin/user/delete"

  /**
   * URL phía người dùng
   */
  readonly API_USER_Pass = "https://salty-cove-09707.herokuapp.com/api/users"
  readonly API_USER_FINDALLNPOTEMAIL = "https://salty-cove-09707.herokuapp.com/api/users/findallnotemail"
  readonly API_USER_Pass_ADMIN = "https://salty-cove-09707.herokuapp.com/api/admin/user"

  /**
   * URL đang ký tài khoản nhân viên
   */
  readonly API_USER_LISTUSER = "https://salty-cove-09707.herokuapp.com/api/admin/user/userlist"
  readonly API_USER_SINUP = "https://salty-cove-09707.herokuapp.com/api/admin/user"


  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  public findByIdUser(id: string): Observable<Users> {
    return this.httpClient.get<Users>(this.URL_FindById + "/" + id);
  }

  public findAllByAccount_Role(role: string, isDeleted: boolean): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(this.URL_USER + "/" + role + "/" + isDeleted);
  }

  public updateUser(user: Users): Observable<any> {
    return this.httpClient.put(this.URL_FindById, user);
  }

  public deleteUser(id: string): Observable<Users> {
    return this.httpClient.delete<Users>(this.URL_FindById_DELETE + "/" + id);
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

  undeleteByIdCustomer(id: string, users: Object): Observable<Users> {
    return this.httpClient.put<Users>(this.URL_UN_USER + "/" + id, users);
  }

  public generateOtpAdmin(userName: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.API_USER_Pass_ADMIN + "/account/generate/" + userName);
  }

  public forgotPasswordADMIN(forgotPassword: ForgotPassword): Observable<Boolean> {
    return this.httpClient.post<Boolean>(this.API_USER_Pass_ADMIN + "/account/forgot-password", forgotPassword);
  }

  /**
   * danhh sách các tài khoản user khác với email của tài khoản hiện tại
   */
  public findUserByNotAccount_Email(email: string): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(this.API_USER_FINDALLNPOTEMAIL + "/" + email);
  }

  /**
   * danhh sách các tài khoản user khác với email của tài khoản hiện tại
   */
  public findUserByNotAccount_EmailADMIN(email: string): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(this.API_USER_FINDALLNPOTEMAIL_ADMIN + "/" + email);
  }

  /**
   * Đăng ký tài khoản nhân viên
   */
  public finAllUser(): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(this.API_USER_LISTUSER);
  }

  /**
   * gửi mã OTP để Đăng ký tài khoản hoặc lấy lại mật khẩu
   * @param email
   */
  public generateOtpSinup(email: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.API_USER_SINUP + "/account/otpsotpsinup/" + email);
  }

  /**
   * Thực hiện thêm mới account
   * @param accountSinup
   * @constructor
   */
  public CreateaccountSinup(accountSinup: AccountSinup): Observable<Account> {
    return this.httpClient.post<Account>(this.API_USER_SINUP + "/account/register", accountSinup);
  }

  /**
   * Thêm mới đồng thời tài khoản user khi thêm account thành công
   * @param users
   * @constructor
   */
  public CreateUser(users: Users): Observable<Users> {
    return this.httpClient.post<Users>(this.API_USER_SINUP + "/user/create", users);
  }

}
