import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../../service/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../service/user.service";
import {Users} from "../../../../../model/user/Users";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  eGender = ['MALE', 'FEMALE', 'OTHER'];
  user !: Users;
  formUser !: FormGroup;
  idUser!: string | null;
  url: string = "";
  selectedFile = File;
  userList: Array<Users> = [];
  email: boolean = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private angularFireStorage: AngularFireStorage,
  ) {
  }

  formLogin = new FormGroup({
      jwt: new FormControl('', Validators.required),
      user: new FormGroup(
        {
          id: new FormControl('', Validators.required),
          fullName: new FormControl('', Validators.required),
          account: new FormGroup(
            {
              userName: new FormControl('', Validators.required),
              role: new FormControl('', Validators.required),
            }
          ),
          email: new FormControl('', Validators.required),
        }
      ),
      status: new FormControl('', Validators.required),
    }
  );

  ngOnInit(): void {
    this.idUser = this.authService.getIdUser();
    console.log(this.idUser)
    // @ts-ignore
    this.userService.findByIdUser(this.idUser).subscribe(
      dataUser => {
        this.user = dataUser;
        this.userService.findUserByNotAccount_EmailADMIN(this.user.email).subscribe(
          (data) => {
            this.userList = data;
            console.log(this.userList);
          })
        this.formUser = new FormGroup(
          {
            id: new FormControl(this.user.id, Validators.required),
            isDeleted: new FormControl(this.user.isDeleted, Validators.required),
            fullName: new FormControl(this.user.fullName, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
            birthday: new FormControl(this.user.birthday, Validators.required),
            email: new FormControl(this.user.email, [Validators.required, Validators.email]),
            phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern("((09|03|07|08|05)+([0-9]{8})\\b)")]),
            gender: new FormControl(this.user.gender, Validators.required),
            image: new FormControl(this.user.image, Validators.required),
            account: new FormControl(this.user.account, Validators.required),
            address: new FormControl(this.user.address, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
          }
        );
      }
    )
  }


  updateUser() {
    console.log(this.userList);
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
        console.log(this.formUser.value);
        this.user = this.formUser.value;
        this.userService.updateUser(this.user).subscribe(
          () => {
            this.snackBar.open("Cập nhập tài khoản thành công", "OK", {
              duration: 4000
            })
          },
          error => {
            this.snackBar.open("Cập nhập thất bại", "OK", {
              duration: 4000
            })
          }
        )
      } else {
        this.snackBar.open("Cập nhập thất bại", "OK", {
          duration: 4000
        })
      }
    }
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
}
