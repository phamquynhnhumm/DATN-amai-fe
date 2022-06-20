import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegistrationService} from "../../../../service/registration.service";
import {Users} from "../../../../model/user/Users";
import {TranslateConfigService} from "../../../../service/translate-config.service";

@Component({
  selector: 'app-sinup-user',
  templateUrl: './sinup-user.component.html',
  styleUrls: ['./sinup-user.component.scss']
})
export class SinupUserComponent implements OnInit {
  sinup: boolean = true;
  user!: Users;
  userList: Array<Users> = [];
  email: boolean = false;
  username: boolean = false;

  constructor(private matSnackBar: MatSnackBar,
              private sinupService: RegistrationService,
              private translateConfigService: TranslateConfigService
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

  formSinUp = new FormGroup(
    {
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern("((09|03|07|08|05)+([0-9]{8})\\b)")]),
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
  formCreateAccount = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl(),
    password: new FormControl('', Validators.required),
    otp: new FormControl('', Validators.required),
  });

  login() {
    location.replace("/login");
  }

  otp() {
    for (const user of this.userList) {
      if (user.email === this.formSinUp.value.email) {
        this.matSnackBar.open("Email đã tồng tại vui lòng đăng ký email mới", "OK", {
          duration: 10000,
          panelClass: ['mat-toolbar', 'mat-warn']
        })
        this.email = true;
        break;
      } else this.email = false;
    }
    if (!this.email) {
      if (this.formSinUp.valid) {
        console.log("đang đăng ký")
        this.matSnackBar.open("Mã OTP đang được gửi đến email của bạn...");
        this.sinupService.generateOtpSinup(this.formSinUp.value.email).subscribe(
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
                panelClass: ['mat-toolbar', 'mat-warn']
              });
            }
          }, error => {
            this.matSnackBar.open("Hệ thống không tìm thấy email của bạn!", "Đóng", {
              duration: 3000
            });
          }
        )
      }
    }
  }

  sinups() {
    this.sinup = false;
    this.formCreateAccount.value.email = this.formSinUp.value.email;
    this.FormUser.value.fullName = this.formSinUp.value.fullName;
    this.FormUser.value.email = this.formSinUp.value.email;
    this.FormUser.value.phone = this.formSinUp.value.phone;
    for (const user of this.userList) {
      if (user.account.userName === this.formCreateAccount.value.userName) {
        this.matSnackBar.open("Tên tài khoản đã tồng tại", "OK", {
          duration: 10000,
          panelClass: ['mat-toolbar', 'mat-warn']
        })
        this.username = true;
        break;
      } else this.username = false;
    }
    if (!this.username) {
      if (this.formCreateAccount.valid) {
        this.sinupService.CreateaccountSinup(this.formCreateAccount.value).subscribe(
          (data) => {
            this.FormUser.value.account = data;
            this.sinupService.CreateUser(this.FormUser.value).subscribe(
              (data) => {
                this.matSnackBar.open("Đăng ký tài khoản thành công", "Đóng", {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-primary']
                })
                location.replace("/DATN-amai-fe/amaife/login");
              }, error => {
                this.matSnackBar.open("Đăng ký tài khoản thất bại", "Đóng", {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-warn'],
                })
              }
            )
          }, error => {
            this.matSnackBar.open("Mã OTP không đúng", "Đóng", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            })
          }
        )
      } else {
        this.matSnackBar.open("Tạo mới tài khoản thấy bại !")._dismissAfter(3000);
      }
    }
  }

  sendotp() {
    this.sinup = true;
  }
}
