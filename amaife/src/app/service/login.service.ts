import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

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
}
