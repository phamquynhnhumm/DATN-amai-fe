import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DetailfoodComponent} from "../../food/detailfood/detailfood.component";
import {FoodDetail} from "../../../../../model/food/FoodDetail";
import {DetailmaterialComponent} from "../../material/detailmaterial/detailmaterial.component";

@Component({
  selector: 'app-detailfooddetail',
  templateUrl: './detailfooddetail.component.html',
  styleUrls: ['./detailfooddetail.component.scss']
})
export class DetailfooddetailComponent implements OnInit {

  foodDetail!: FoodDetail;

  constructor(private dialogRef: MatDialogRef<DetailfooddetailComponent>,
              private foodcategoryService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.foodDetail = this.data;
  }

  deletefoodDetail() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi tiết nguyên liệu thành công", "OK", {
      duration: 4000
    })
  }

  OpenMaterial(foodDetail: FoodDetail) {
    this.foodcategoryService.findByIdMaterial(foodDetail.material.id).subscribe(
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
  openfood(foodDetail: FoodDetail) {
    this.foodcategoryService.findByIdFood(foodDetail.food.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailfoodComponent, {
          width: '800px',
          height: '550px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }
}
