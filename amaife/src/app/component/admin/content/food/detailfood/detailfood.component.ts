import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Food} from "../../../../../model/food/Food";
import {EStatusFood} from "../../../../../model/food/EStatusFood";
import {FoodDetail} from "../../../../../model/food/FoodDetail";
import {DetailmaterialComponent} from "../../material/detailmaterial/detailmaterial.component";

@Component({
  selector: 'app-detailfood',
  templateUrl: './detailfood.component.html',
  styleUrls: ['./detailfood.component.scss']
})
export class DetailfoodComponent implements OnInit {

  food!: Food;
  eStatusFood = EStatusFood;
  foodDetail !: Array<FoodDetail>

  constructor(private dialogRef: MatDialogRef<DetailfoodComponent>,
              private foodService: FoodService,
              private materialService: FoodService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.food = this.data;
    this.foodService.findByMaterailFindByIdFood(this.food.id).subscribe(
      (data) => {
        this.foodDetail = data;
      }
    )
  }

  deletefood() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi tiết món thành công", "OK", {
      duration: 4000
    })
  }

  openDetailMaterail(foodDetail: FoodDetail) {
    this.materialService.findByIdMaterial(foodDetail.material.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailmaterialComponent, {
          width: '800px',
          height: '450px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }
}
