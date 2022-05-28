import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registration} from "../model/class/Registration";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  readonly URL_CLASS = "http://localhost:8080/api/class/create";

  /**
   * Đăng ký nhận tư vấn ( tự chế biến món)
   * @param registration
   */
  createRegistration(registration: Object): Observable<Registration> {
    return this.httpClient.post<Registration>(this.URL_CLASS, registration, {headers: this.requestHeader});
  }
}
