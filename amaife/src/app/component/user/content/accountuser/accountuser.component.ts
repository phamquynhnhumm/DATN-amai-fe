import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {Users} from "../../../../model/user/Users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {RegistrationService} from "../../../../service/registration.service";

@Component({
  selector: 'app-accountuser',
  templateUrl: './accountuser.component.html',
  styleUrls: ['./accountuser.component.scss']
})
export class AccountuserComponent implements OnInit {
  eGender = ['MALE', 'FEMALE', 'OTHER'];
  user !: Users;
  formUser !: FormGroup;
  idUser!: string | null;
  selectedFile: File | any;
  url: string = "";
  userList: Array<Users> = [];
  email: boolean = false;

  constructor(
    private AccountfindAllService: UserService,
    public authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private angularFireStorage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.idUser = this.authService.getIdUser();
    // @ts-ignore
    this.userService.findByIdUser(this.idUser).subscribe(
      dataUser => {
        this.user = dataUser;
        this.AccountfindAllService.findUserByNotAccount_Email(this.user.email).subscribe(
          (data) => {
            this.userList = data;
          }
        )
        this.formUser = new FormGroup(
          {
            id: new FormControl(this.user.id, Validators.required),
            isDeleted: new FormControl(this.user.isDeleted, Validators.required),
            fullName: new FormControl(this.user.fullName, Validators.required),
            birthday: new FormControl(this.user.birthday),
            email: new FormControl(this.user.email, [Validators.required, Validators.email]),
            phone: new FormControl(this.user.phone, Validators.required),
            gender: new FormControl(this.user.gender),
            image: new FormControl(this.user.image),
            account: new FormControl(this.user.account, Validators.required),
            address: new FormControl(this.user.address),
          }
        );
      }
    )

  }

  selectFile(event: any) {
    const path = new Date().toString();
    this.selectedFile = event.target.files[0];
    this.angularFireStorage.upload(path, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        this.angularFireStorage.ref(path).getDownloadURL().subscribe(
          (data) => {
            this.url = data;
            this.user.image = this.url;
            if (this.user.image != '') {
              this.userService.updateUser(this.user).subscribe(
                () => {
                  this.snackBar.open("Cập nhật avata thành công", "OK", {
                    duration: 4000,
                    panelClass: ['mat-toolbar', 'mat-primary']
                  })
                  window.location.reload();
                }
              );
              this.url = "";
            } else {
              this.snackBar.open("Cập nhật avata thất bại", "OK", {
                duration: 4000,
                panelClass: ['mat-toolbar', 'mat-primary']
              });
            }
          }, error => {
            this.snackBar.open("Cập nhật avata thất bại", "OK", {
              duration: 4000,
              panelClass: ['mat-toolbar', 'mat-primary']

            });
          }
        )
      })
    ).subscribe();
  }

  updateUser() {
    for (const user of this.userList) {
      if (user.email === this.formUser.value.email) {
        this.snackBar.open("Email đã trùng với tài khoản khác", "OK", {
          duration: 10000,
          panelClass: ['mat-toolbar', 'mat-warn']
        })
        this.email = true;
        break;
      } else this.email = false;
    }
    if (!this.email) {
      if (this.formUser.valid) {
        this.user = this.formUser.value;
        this.userService.updateUser(this.user).subscribe(
          () => {
            this.snackBar.open("Cập nhập tài khoản thành công", "OK", {
              duration: 4000,
              panelClass: ['mat-toolbar', 'mat-primary']
            })
          }
        )
      }
    }
  }
}
