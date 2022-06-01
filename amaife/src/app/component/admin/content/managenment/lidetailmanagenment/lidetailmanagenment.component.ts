import {Component, Inject, OnInit} from '@angular/core';
import {Users} from "../../../../../model/user/Users";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-lidetailmanagenment',
  templateUrl: './lidetailmanagenment.component.html',
  styleUrls: ['./lidetailmanagenment.component.scss']
})
export class LidetailmanagenmentComponent implements OnInit {

  user!: Users;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<LidetailmanagenmentComponent>,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.user = this.data;
  }

  cancel() {
    this.dialogRef.close();
    this.snackBar.open("Tắt thông tin nhân viên", "OK", {
      duration: 4000
    })
  }
}
