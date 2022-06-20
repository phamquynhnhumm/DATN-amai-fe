import {Component, Inject, OnInit} from '@angular/core';
import {Food} from "../../../../../model/food/Food";
import {EStatusFood} from "../../../../../model/food/EStatusFood";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Users} from "../../../../../model/user/Users";

@Component({
  selector: 'app-detailcustomer',
  templateUrl: './detailcustomer.component.html',
  styleUrls: ['./detailcustomer.component.scss']
})
export class DetailcustomerComponent implements OnInit {

  user!: Users;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DetailcustomerComponent>,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.user = this.data;
  }

  cancel() {
    this.dialogRef.close();
    this.snackBar.open("Tắt thông tin khách hàng", "OK", {
      duration: 4000
    })
  }
}
