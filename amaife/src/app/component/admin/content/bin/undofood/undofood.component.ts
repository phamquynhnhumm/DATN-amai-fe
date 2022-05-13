import {Component, Inject, OnInit} from '@angular/core';
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Food} from "../../../../../model/food/Food";

@Component({
  selector: 'app-undofood',
  templateUrl: './undofood.component.html',
  styleUrls: ['./undofood.component.scss']
})
export class UndofoodComponent implements OnInit {
  food!: Food;
  constructor(private dialogRef: MatDialogRef<UndofoodComponent>,
              private foodService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.food = this.data;
  }

  undofood() {
    this.food.isDeleted = false;
    this.foodService.undeleteByIdFood(this.food.id, this.food).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Hoàn tác món thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
