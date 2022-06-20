import {Component, OnInit} from '@angular/core';
import {Users} from "../../../../model/user/Users";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegistrationService} from "../../../../service/registration.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TranslateConfigService} from "../../../../service/translate-config.service";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  sinup: boolean = true;
  user!: Users;
  userList: Array<Users> = [];
  email: boolean = false;

  constructor(private matSnackBar: MatSnackBar,
              private sinupService: RegistrationService,
              private translateConfigService: TranslateConfigService,
              private newPassService: RegistrationService,
              private route: Router
  ) {
  }

  ngOnInit(): void {
    this.sinupService.finAllUser().subscribe(
      (data) => {
        this.userList = data;
      }
    )
  }

  /* Change default language */
  changeDefaultLanguages(event: any) {
    console.log(event.target.value)
    this.translateConfigService.changeLanguage(event.target.value);
  }

  formforgotPassword = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
    }
  )
  FormUser = new FormGroup(
    {
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
    }
  )
  formnewpassword = new FormGroup({
    email: new FormControl(''),
    newPassword: new FormControl('', Validators.required),
    otp: new FormControl('', Validators.required),
  });

  login() {
    location.replace("/DATN-amai-fe/amaife/login");
  }

  otp() {
    for (const user of this.userList) {
      if (user.email === this.formforgotPassword.value.email) {
        if (this.formforgotPassword.valid) {
          this.matSnackBar.open("Mã OTP đang được gửi đến email của bạn...");
          this.sinupService.generateOtpnewpassword(this.formforgotPassword.value.email).subscribe(
            (data) => {
              if (data) {
                this.sinup = false;
                this.matSnackBar.open("Đã gửi mã OTP thành công đến email", "OK", {
                  duration: 10000,
                  panelClass: ['mat-toolbar', 'mat-primary']
                })
              } else {
                this.matSnackBar.open("Tài khoản chưa xác thực, lấy mã otp thất bại", "OK", {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-primary']
                });
              }
            }, error => {
              this.matSnackBar.open("Hệ thống không tìm thấy email của bạn!", "Đóng", {
                duration: 3000
              });
            }
          )
        }
        this.email = true;
        break;
      } else this.email = false;
    }
    if (!this.email) {
      this.matSnackBar.open("Email của bạn chưa đăng ký", "OK", {
        duration: 10000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
    }
  }

  newpassword() {
    this.sinup = false;
    this.formnewpassword.value.email = this.formforgotPassword.value.email;
    if (this.formnewpassword.valid) {
      this.newPassService.newpassword(this.formnewpassword.value).subscribe(
        (data) => {
          if (data) {
            this.matSnackBar.open("Đã đổi mật khẩu thành công", "Đóng", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-primary']
            })
            location.replace("/DATN-amai-fe/amaife/login");
          } else if (data == null) {
            this.matSnackBar.open("Hệ thống đang bảo trì", "Đóng", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            })
          } else {
            this.matSnackBar.open("Mã OTP không đúng", "Đóng", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            })
          }
        },
        (error) => {
          if (error.status == 400) {
            this.matSnackBar.open("Mã OTP không đúng", "Đóng", {
              duration: 3000
            });
          } else {
            this.matSnackBar.open("Vui lòng kiểm tra lại thông tin !", "Đóng", {
              duration: 3000
            });
          }
        }
      );
    }
  }


  sendotp() {
    this.sinup = true;
  }
}
