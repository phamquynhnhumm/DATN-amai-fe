import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {UserService} from "../../../../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {Users} from "../../../../model/user/Users";
import {Router} from "@angular/router";

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {

  isInputOtp: boolean = false;
  userName: string = "";
  isGetOtp: boolean = true;
  user !: Users;
  idUser!: string | null;
  fieldTextType: boolean | any;

  constructor(private userService: UserService,
              public authService: AuthService,
              private matSnackBar: MatSnackBar,
              private route: Router,
  ) {
  }

  formForgotPassword = new FormGroup({
    userName: new FormControl(),
    newPassword: new FormControl(),
    otp: new FormControl()
  });

  ngOnInit(): void {
    this.idUser = this.authService.getIdUser();
    // @ts-ignore
    this.userService.findByIdUser(this.idUser).subscribe(
      dataUser => {
        this.user = dataUser;
      });
  }

  sendOtp(userName: string) {
    if (userName !== "") {
      this.userName = userName;
      this.matSnackBar.open("Mã OTP đang được gửi đến email của bạn...");
      if (this.userName == this.authService.getUsername()) {
        this.isGetOtp = false;
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
      } else {
        this.matSnackBar.open("Tên đăng nhập không hợp lệ !", "Đóng", {
          duration: 3000
        });
      }
    }
  }

  changePassword() {
    if (this.formForgotPassword.valid) {
      this.userService.forgotPassword(this.formForgotPassword.value).subscribe(
        (data) => {
          if (data) {
            this.route.navigateByUrl("/user").then(() =>
              this.matSnackBar.open("Đã đổi mật khẩu thành công", "Đóng", {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary']
              }))
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
        }
      );
    }
  }
}
