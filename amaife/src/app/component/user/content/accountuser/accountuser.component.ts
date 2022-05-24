import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {Users} from "../../../../model/user/Users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
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
        console.log(dataUser)
        this.user = dataUser;
        this.formUser = new FormGroup(
          {
            id: new FormControl(this.user.id, Validators.required),
            isDeleted: new FormControl(this.user.isDeleted, Validators.required),
            fullName: new FormControl(this.user.fullName, Validators.required),
            birthday: new FormControl(this.user.birthday, Validators.required),
            email: new FormControl(this.user.email, Validators.required),
            phone: new FormControl(this.user.phone, Validators.required),
            gender: new FormControl(this.user.gender, Validators.required),
            image: new FormControl(this.user.image, Validators.required),
            account: new FormControl(this.user.account, Validators.required),
            address: new FormControl(this.user.address, Validators.required),
          }
        );
      }
    )
  }

  updateUser() {
    if (this.formUser.valid) {
      console.log(this.formUser.value);
      this.user = this.formUser.value;
      this.userService.updateUser(this.user).subscribe(
        () => {
          this.snackBar.open("Cập nhập tài khoản thành công", "OK", {
            duration: 4000
          })
        }
      )
    }

  }
}
