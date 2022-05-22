import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../model/user/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly URL_USER = "http://localhost:8080/api/admin/user"

  constructor(private httpClient: HttpClient) {
  }

  findByIdUser(id: string): Observable<Users> {
    return this.httpClient.get<Users>(this.URL_USER + "/" + id);
  }
}
