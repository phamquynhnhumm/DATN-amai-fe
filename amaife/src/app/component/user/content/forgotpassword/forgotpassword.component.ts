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
    location.replace("/login");
  }

  otp() {
    for (const user of this.userList) {
      if (user.email === this.formforgotPassword.value.email) {
        if (this.formforgotPassword.valid) {
          this.matSnackBar.open("M?? OTP ??ang ???????c g???i ?????n email c???a b???n...");
          this.sinupService.generateOtpnewpassword(this.formforgotPassword.value.email).subscribe(
            (data) => {
              if (data) {
                this.sinup = false;
                this.matSnackBar.open("???? g???i m?? OTP th??nh c??ng ?????n email", "OK", {
                  duration: 10000,
                  panelClass: ['mat-toolbar', 'mat-primary']
                })
              } else {
                this.matSnackBar.open("T??i kho???n ch??a x??c th???c, l???y m?? otp th???t b???i", "OK", {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-primary']
                });
              }
            }, error => {
              this.matSnackBar.open("H??? th???ng kh??ng t??m th???y email c???a b???n!", "????ng", {
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
      this.matSnackBar.open("Email c???a b???n ch??a ????ng k??", "OK", {
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
            this.matSnackBar.open("???? ?????i m???t kh???u th??nh c??ng", "????ng", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-primary']
            })
            location.replace("/login");
          } else if (data == null) {
            this.matSnackBar.open("H??? th???ng ??ang b???o tr??", "????ng", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            })
          } else {
            this.matSnackBar.open("M?? OTP kh??ng ????ng", "????ng", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            })
          }
        },
        (error) => {
          if (error.status == 400) {
            this.matSnackBar.open("M?? OTP kh??ng ????ng", "????ng", {
              duration: 3000
            });
          } else {
            this.matSnackBar.open("Vui l??ng ki???m tra l???i th??ng tin !", "????ng", {
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
