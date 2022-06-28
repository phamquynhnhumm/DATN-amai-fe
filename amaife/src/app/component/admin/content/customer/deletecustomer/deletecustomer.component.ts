import {Component, Inject, OnInit} from '@angular/core';
import {Users} from "../../../../../model/user/Users";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-deletecustomer',
  templateUrl: './deletecustomer.component.html',
  styleUrls: ['./deletecustomer.component.scss']
})
export class DeletecustomerComponent implements OnInit {

  users!: Users;

  constructor(private dialogRef: MatDialogRef<DeletecustomerComponent>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.users = this.data;
  }

  Deleteusers() {
    this.userService.deleteUser(this.users.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xoá tài khoản khách hàng thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
