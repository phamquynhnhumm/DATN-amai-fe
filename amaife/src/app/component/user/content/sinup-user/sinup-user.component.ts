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
        this.matSnackBar.open("Email ???? t???ng t???i vui l??ng ????ng k?? email m???i", "OK", {
          duration: 10000,
          panelClass: ['mat-toolbar', 'mat-warn']
        })
        this.email = true;
        break;
      } else this.email = false;
    }
    if (!this.email) {
      if (this.formSinUp.valid) {
        console.log("??ang ????ng k??")
        this.matSnackBar.open("M?? OTP ??ang ???????c g???i ?????n email c???a b???n...");
        this.sinupService.generateOtpSinup(this.formSinUp.value.email).subscribe(
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
                panelClass: ['mat-toolbar', 'mat-warn']
              });
            }
          }, error => {
            this.matSnackBar.open("H??? th???ng kh??ng t??m th???y email c???a b???n!", "????ng", {
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
        this.matSnackBar.open("T??n t??i kho???n ???? t???ng t???i", "OK", {
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
                this.matSnackBar.open("????ng k?? t??i kho???n th??nh c??ng", "????ng", {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-primary']
                })
                location.replace("/login");
              }, error => {
                this.matSnackBar.open("????ng k?? t??i kho???n th???t b???i", "????ng", {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-warn'],
                })
              }
            )
          }, error => {
            this.matSnackBar.open("M?? OTP kh??ng ????ng", "????ng", {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            })
          }
        )
      } else {
        this.matSnackBar.open("T???o m???i t??i kho???n th???y b???i !")._dismissAfter(3000);
      }
    }
  }

  sendotp() {
    this.sinup = true;
  }
}
