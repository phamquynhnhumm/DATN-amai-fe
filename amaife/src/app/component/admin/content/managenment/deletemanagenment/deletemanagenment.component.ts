import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Users} from "../../../../../model/user/Users";
import {UserService} from "../../../../../service/user.service";

@Component({
  selector: 'app-deletemanagenment',
  templateUrl: './deletemanagenment.component.html',
  styleUrls: ['./deletemanagenment.component.scss']
})
export class DeletemanagenmentComponent implements OnInit {

  users!: Users;

  constructor(private dialogRef: MatDialogRef<DeletemanagenmentComponent>,
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
      this.snackBar.open("Xoá tài khoản nhân viên thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
