import {Component, Inject, OnInit} from '@angular/core';
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodService} from "../../../../../service/food.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Users} from "../../../../../model/user/Users";
import {Oder} from "../../../../../model/order/Oder";
import {OrderService} from "../../../../../service/order.service";
import {UserService} from "../../../../../service/user.service";

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  users!: Users;
  eRole = ['ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_CUSTOMER']

  constructor(
    private dialogRef: MatDialogRef<UpdateRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private userService: UserService) {
  }

  formUser!: FormGroup;

  ngOnInit(): void {
    this.users = this.data;
    console.log(this.users)
    this.formUser = new FormGroup(
      {
        role: new FormControl(this.users.account.role),
        isDeleted: new FormControl(this.data.isDeleted),
      }
    );
  }

  bolen: boolean = false;

  cencal() {
    this.bolen = true;
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật quyền thành công", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    /**
     * Trách trường hợp isDelete null
     */
    if (this.formUser.value.isDeleted) {
      this.formUser.value.isDeleted = true;
    } else {
      this.formUser.value.isDeleted = false;
    }
    if (this.formUser.valid) {
      console.log(this.formUser.value)
      this.users.account.role = this.formUser.value.role;
      if (!this.bolen) {
        this.users.isDeleted = this.formUser.value.isDeleted;
        console.log(this.users);
        this.userService.updateUser(this.users).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật quyền thành công", "OK", {
              duration: 4000
            })
          }
        )
      }
    } else {
      this.snackBar.open("Cập nhật thấy bại !")._dismissAfter(3000);
    }
  }
}
