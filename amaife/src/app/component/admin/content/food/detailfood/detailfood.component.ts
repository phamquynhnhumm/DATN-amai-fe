import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Food} from "../../../../../model/food/Food";
import {EStatusFood} from "../../../../../model/food/EStatusFood";

@Component({
  selector: 'app-detailfood',
  templateUrl: './detailfood.component.html',
  styleUrls: ['./detailfood.component.scss']
})
export class DetailfoodComponent implements OnInit {

  food!: Food;
  eStatusFood = EStatusFood;

  constructor(private dialogRef: MatDialogRef<DetailfoodComponent>,
              private foodService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.food = this.data;
  }

  deletefood() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi tiết món thành công", "OK", {
      duration: 4000
    })
  }
}
