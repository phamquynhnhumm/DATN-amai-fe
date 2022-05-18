import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {LoginRequest} from "../model/login/LoginRequest";
import {Observable} from "rxjs";
import {LoginResponse} from "../model/login/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_LOGIN_ADMIN = "http://localhost:8080/api/login"
  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  /**
   * Headers: requestHeader địa diện cho việc không phân quyền ai cũng có thể truy cập vào
   * @param loginRequest
   */
  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.API_LOGIN_ADMIN, loginRequest, {headers: this.requestHeader})
  }

  public roleMatch(allowedRole: string[]): boolean {
    let isMatch = true;
    const role = this.authService.getRole();

    if (role !== null) {
      for (let i = 0; i < allowedRole.length; i++) {
        if (role == allowedRole[i]) {
          return true;
        } else {
          isMatch = false;
        }
      }
    }
    return isMatch;
  }
}
