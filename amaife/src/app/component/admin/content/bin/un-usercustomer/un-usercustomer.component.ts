import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../../../service/user.service";
import {Users} from "../../../../../model/user/Users";

@Component({
  selector: 'app-un-usercustomer',
  templateUrl: './un-usercustomer.component.html',
  styleUrls: ['./un-usercustomer.component.scss']
})
export class UnUsercustomerComponent implements OnInit {
  users!: Users;

  constructor(private dialogRef: MatDialogRef<UnUsercustomerComponent>,
              private usserService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.users = this.data;
  }

  undovCustomer() {
    this.users.isDeleted = false;
    this.usserService.undeleteByIdCustomer(this.users.id, this.users).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Hoàn tác tài khoản khách hàng thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
