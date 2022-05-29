import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {UserService} from "../../../../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {

  isInputOtp: boolean = false;
  userName: string = "";
  isGetOtp: boolean = true;

  fieldTextType: boolean | any;

  constructor(private userService: UserService,
              public authService: AuthService,
              private matSnackBar: MatSnackBar) {
  }

  formForgotPassword = new FormGroup({
    userName: new FormControl(),
    newPassword: new FormControl(),
    otp: new FormControl()
  });

  ngOnInit(): void {

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  sendOtp(userName: string) {
    if (userName !== "") {
      this.isGetOtp = false;
      this.userName = userName;
      this.matSnackBar.open("Mã OTP đang được gửi đến email của bạn...");
      this.userService.generateOtp(userName).subscribe(
        (data) => {
          console.log(data)
          if (data) {
            this.isInputOtp = true;
            this.ngOnInit()
            this.matSnackBar.open("Đã gửi mã OTP thành công đến email", "OK", {
              duration: 10000,
              panelClass: ['mat-toolbar', 'mat-primary']
            })
          } else {
            this.isGetOtp = true;
            this.matSnackBar.open("Tài khoản chưa xác thực, lấy mã otp thất bại", "OK", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-primary']
            });
          }
        },
        (error) => {
          this.isGetOtp = true;
          if (error.status === 400) {
            if (error.error) {
              this.matSnackBar.open("Tài khoản đã bị khóa !", "Đóng", {
                duration: 3000
              });
            } else {
              this.matSnackBar.open("Tài khoản không tồn tại !", "Đóng", {
                duration: 3000
              });
            }
          } else {
            this.matSnackBar.open("Hệ thống đang bảo trì !", "Đóng", {
              duration: 3000
            });
          }

        }
      )
    }

  }

  changePassword() {
    if (this.formForgotPassword.valid) {
      console.log(this.formForgotPassword.value)
      this.userService.forgotPassword(this.formForgotPassword.value).subscribe(
        (data) => {
          if (data) {
            // this.matDialogRef.close();
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
          if (error.status === 400) {
            if (!error.error) {
              this.matSnackBar.open("Mã OTP không đúng", "Đóng", {
                duration: 3000
              });
            } else {
              this.matSnackBar.open("Tài khoản không tồn tại !", "Đóng", {
                duration: 3000
              });
            }
          }
        }
      );
    }
  }
}
