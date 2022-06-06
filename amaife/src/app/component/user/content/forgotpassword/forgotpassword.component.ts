import {Component, OnInit} from '@angular/core';
import {Users} from "../../../../model/user/Users";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegistrationService} from "../../../../service/registration.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  sinup: boolean = true;
  user!: Users;

  constructor(private matSnackBar: MatSnackBar,
              private sinupService: RegistrationService,
              private newPassService: RegistrationService
  ) {
  }

  ngOnInit(): void {
  }

  formforgotPassword = new FormGroup(
    {
      emailnew: new FormControl('', Validators.required),
    }
  )
  FormUser = new FormGroup(
    {
      fullName: new FormControl('', Validators.required),
      emailnew: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
    }
  )
  formnewpassword = new FormGroup({
    emailnew: new FormControl(''),
    newPassword: new FormControl('', Validators.required),
    otp: new FormControl('', Validators.required),
  });

  login() {
    location.replace("/login");
  }

  otp() {
    if (this.formforgotPassword.valid) {
      console.log("đang chờ nhận mã OTP")
      this.matSnackBar.open("Mã OTP đang được gửi đến email của bạn...");
      this.sinupService.generateOtpnewpassword(this.formforgotPassword.value.emailnew).subscribe(
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
  }

  newpassword() {
    this.sinup = false;
    this.formnewpassword.value.emailnew = this.formforgotPassword.value.emailnew;
    console.log(this.formnewpassword.value)
    if (this.formnewpassword.valid) {
      this.newPassService.newpassword(this.formnewpassword.value).subscribe(
        (data) => {
          if (data) {
            this.matSnackBar.open("Đã đổi mật khẩu thành công", "Đóng", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-primary']
            })
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
