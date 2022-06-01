import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../service/user.service";
import {AuthService} from "../../../../../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {

  isInputOtp: boolean = false;
  userName: string = "";
  isGetOtp: boolean = true;

  fieldTextType: boolean | any;

  constructor(private userService: UserService,
              public authService: AuthService,
              private matSnackBar: MatSnackBar
  ) {
  }

  formForgotPassword = new FormGroup({
    userName: new FormControl(),
    newPassword: new FormControl(),
    otp: new FormControl()
  });

  ngOnInit(): void {

  }

  sendOtp(userName: string) {
    if (userName !== "") {
      this.userName = userName;
      this.matSnackBar.open("Mã OTP đang được gửi đến email của bạn...");
      if (this.userName == this.authService.getUsername()) {
        this.isGetOtp = false;
        this.userService.generateOtpAdmin(userName).subscribe(
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
      } else {
        this.matSnackBar.open("Tên đăng nhập không hợp lệ !", "Đóng", {
          duration: 3000
        });
      }
    }
  }

  changePassword() {
    if (this.formForgotPassword.valid) {
      this.userService.forgotPasswordADMIN(this.formForgotPassword.value).subscribe(
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
          // if (error.status == 400) {
          console.log(error.status)
          if (error.status == 400) {
            this.matSnackBar.open("Mã OTP không đúng", "Đóng", {
              duration: 3000
            });
          } else {
            this.matSnackBar.open("Vui lòng kiểm tra lại thông tin !", "Đóng", {
              duration: 3000
            });
          }
          // }
        }
      );
    }
  }
}
