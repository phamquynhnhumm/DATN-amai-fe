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
    localStorage.setItem("fullName", authoricationResponse.user.fullName);
    localStorage.setItem("id", authoricationResponse.user.id);
    localStorage.setItem("role", authoricationResponse.user.account.role);
    localStorage.setItem("token", authoricationResponse.jwt);
    localStorage.setItem("userName", authoricationResponse.user.account.userName);
  }

  public assignSessionStorageWithLocalStorage() {
    this.setToken(<string>localStorage.getItem('token'));
    this.setRole(<string>localStorage.getItem('role'));
    this.setFullName(<string>localStorage.getItem('fullName'));
    this.setUsername(<string>localStorage.getItem('userName'));
    this.setIdUser(<string>localStorage.getItem("id"));
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

  public setIdUser(id: string) {
    sessionStorage.setItem("id", id);
  }

  public getIdUser() {
    return sessionStorage.getItem("id");
  }

  public clear() {
    sessionStorage.clear();
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRole() && this.getToken();
  }
}
