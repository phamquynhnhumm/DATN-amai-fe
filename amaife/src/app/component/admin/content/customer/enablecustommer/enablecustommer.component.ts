import {Component, Inject, OnInit} from '@angular/core';
import {Users} from "../../../../../model/user/Users";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-enablecustommer',
  templateUrl: './enablecustommer.component.html',
  styleUrls: ['./enablecustommer.component.scss']
})
export class EnablecustommerComponent implements OnInit {

  users!: Users;

  constructor(private dialogRef: MatDialogRef<EnablecustommerComponent>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.users = this.data;
  }

  enalleusers() {
    this.userService.enableUser(this.users.id, this.users).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Khóa tài khoản  thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
