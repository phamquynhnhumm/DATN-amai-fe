import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../../service/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../service/user.service";
import {Users} from "../../../../../model/user/Users";

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

  constructor(private authService: AuthService,
              private userService: UserService,
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
    this.userService.findByIdUser('2').subscribe(
      dataUser => {
        console.log(dataUser)
        this.user = dataUser;
      }
    )
    this.formUser = new FormGroup(
      {
        id: new FormControl(this.user.id, Validators.required),
        isDeleted: new FormControl(this.user.isDeleted, Validators.required),
        fullName: new FormControl(this.authService.getFullName(), Validators.required),
        birthday: new FormControl(this.user.birthday, Validators.required),
        email: new FormControl(this.user.email, Validators.required),
        phone: new FormControl(this.user.phone, Validators.required),
        gender: new FormControl(this.user.gender, Validators.required),
        image: new FormControl(this.user.image, Validators.required),
        account: new FormControl(this.user.account, Validators.required),
        address: new FormControl(this.user.address, Validators.required),
      }
    )

  }

  updateUser() {

  }
}
