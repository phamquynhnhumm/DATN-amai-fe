import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../../../service/user.service";
import {config} from "rxjs";
import {RegistrationService} from "../../../../../service/registration.service";

@Component({
  selector: 'app-sinup-user',
  templateUrl: './sinup-user.component.html',
  styleUrls: ['./sinup-user.component.scss']
})
export class SinupUserComponent implements OnInit {
  sinup: boolean = true;

  constructor(private matSnackBar: MatSnackBar,
              private sinupService: RegistrationService
  ) {
  }

  ngOnInit(): void {
  }

  formSinUp = new FormGroup(
    {
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    }
  )
  formForgotPassword = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    otp: new FormControl()
  });

  login() {
    location.replace("/login");
  }

  otp() {
    console.log(this.formSinUp.value);
    console.log(this.formSinUp.value.email);
    if (this.formSinUp.valid) {
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

  sinups() {
    this.sinup = true;
  }
}
