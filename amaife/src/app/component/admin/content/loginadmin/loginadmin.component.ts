import {Component, OnInit} from '@angular/core';
import {LoginRequest} from "../../../../model/login/LoginRequest";
import {LoginResponse} from "../../../../model/login/LoginResponse";
import {TokenDTO} from "../../../../model/login/TokenDTO";
import {LoginService} from "../../../../service/login.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {TranslateConfigService} from "../../../../service/translate-config.service";

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.scss']
})
export class LoginadminComponent implements OnInit {

  authoricationRequest: LoginRequest | any;
  authoricationResponse: LoginResponse | any;
  rememberMe = 0;
  errorUsername: string = "";
  errorPassword: string = "";
  isLoginValid = false;

  token: TokenDTO = new class implements TokenDTO {
    token: string = "";
  };

  constructor(private loginService: LoginService,
              private translateConfigService: TranslateConfigService,
              private router: Router,
              private socialAuthService: SocialAuthService,
              private authService: AuthService,
              private matSnackBar: MatSnackBar) {
  }

  formLogin = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    if (this.authService.getToken() !== null) {
      this.router.navigate(['/login']).then(
        () => window.location.reload()
      )
    }
  }

  /* Change default language */
  changeDefaultLanguages(event: any) {
    console.log(event.target.value)
    this.translateConfigService.changeLanguage(event.target.value);
  }

  public setLoginComplete(loginResponse: LoginResponse) {
    if (this.rememberMe % 2 === 1) {
      this.authService.setLocalStorage(loginResponse);
    }
    this.authService.setSessionStorage(loginResponse);
    const role = loginResponse.user.account.role;
    switch (role) {
      case "ROLE_MANAGEMENT":
        this.router.navigate(['/admin']);
        location.replace("/admin");
        break;
      case "ROLE_CUSTOMER":
        this.router.navigate(['/home']);
        location.replace("/home");
        break;
      case "ROLE_ADMIN":
        this.router.navigate(['/admin']);
        location.replace("/admin");
        break;
      default:
        this.router.navigate(['/login'])
        window.location.reload();
    }
  }

  login() {
    if (this.formLogin.valid) {
      this.loginService.login(this.formLogin.value).subscribe(
        (authoricationResponse) => {
          this.authService.setLocalStorage(authoricationResponse);
          this.setLoginComplete(authoricationResponse)
        },
        (error) => {
          this.isLoginValid = false;
          switch (error.error.status) { // error.error.status = 404 or 400
            case "Username not exists":
              this.errorUsername = "Tài khoản hoặc mật khẩu sai";
              this.errorPassword = "";
              break;
            case "Account locked":
              this.errorUsername = "Tài khoản của bạn đã bị khóa";
              this.errorPassword = "";
              break;
            default:
              this.matSnackBar.open("Hệ thống đang bảo trì vui lòng đăng nhập lại", "OK", {
                panelClass: ['mat-toolbar', 'mat-primary'],
                duration: 5000
              });
          }
        }
      )
    } else {
      this.isLoginValid = true;
    }
  }

  sinup() {
    location.replace("/sinup")
  }

  forgotPassword() {
    location.replace("/forgot")
  }

}
