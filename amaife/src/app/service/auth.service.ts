import {Injectable} from '@angular/core';
import {LoginResponse} from "../model/login/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public setSessionStorage(authoricationResponse: LoginResponse) {
    this.setToken(authoricationResponse.jwt);
    this.setRole(authoricationResponse.user.account.role);
    this.setFullName(authoricationResponse.user.fullName);
    this.setUsername(authoricationResponse.user.account.userName);
    this.setIdUser(authoricationResponse.user.id);
  }

  public setLocalStorage(authoricationResponse: LoginResponse) {
    localStorage.setItem("token", authoricationResponse.jwt);
    localStorage.setItem("role", authoricationResponse.user.account.role);
    localStorage.setItem("fullName", authoricationResponse.user.fullName);
    localStorage.setItem("userName", authoricationResponse.user.account.userName);
    localStorage.setItem("idUser", String(authoricationResponse.user.id));
  }

  public assignSessionStorageWithLocalStorage() {
    this.setToken(<string>localStorage.getItem('token'));
    this.setRole(<string>localStorage.getItem('role'));
    this.setFullName(<string>localStorage.getItem('fullName'));
    this.setUsername(<string>localStorage.getItem('userName'));
    // this.setIdUser(<string>localStorage.getItem("idUser"));
  }

  public setRole(role: string) {
    sessionStorage.setItem("role", role);
  }
  public setToken(jwt: string) {
    sessionStorage.setItem("token", jwt);
  }
  public setFullName(fullName: string) {
    sessionStorage.setItem("fullName", fullName);
  }

  public setUsername(username: string) {
    sessionStorage.setItem("userName", username);
  }

  public getRole() {
    return sessionStorage.getItem("role")
  }

  public getToken() {
    return sessionStorage.getItem("token");
  }

  public getFullName() {
    return sessionStorage.getItem("fullName");
  }

  public getUsername() {
    return sessionStorage.getItem("userName");
  }

  public setIdUser(idUser: number) {
    sessionStorage.setItem("idUser", String(idUser));
  }

  public getIdUser() {
    return sessionStorage.getItem("idUser");
  }

  public clear() {
    sessionStorage.clear();
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRole() && this.getToken();
  }
}
