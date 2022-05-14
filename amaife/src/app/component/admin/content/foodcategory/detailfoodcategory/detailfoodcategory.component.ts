import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Food} from "../../../../../model/food/Food";
import {DetailfoodComponent} from "../../food/detailfood/detailfood.component";

@Component({
  selector: 'app-detailfoodcategory',
  templateUrl: './detailfoodcategory.component.html',
  styleUrls: ['./detailfoodcategory.component.scss']
})
export class DetailfoodcategoryComponent implements OnInit {

  foodcategory!: FoodCategory;
  foods!: Array<Food> | any;
  foodnull!: boolean;

  constructor(private dialogRef: MatDialogRef<DetailfoodcategoryComponent>,
              private foodcategoryService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.foodcategory = this.data;

    this.foodcategoryService.findAllFoodByFoodCategory_Id(this.foodcategory.id).subscribe(
      datas => {
        this.foods = datas;
      },
      error => {
        this.foodnull = false;
      }
    )
  }

  deletefoodcategory() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi tiết danh mục thành công", "OK", {
      duration: 4000
    })
  }

  openDetailFood(food: Food) {
    this.foodcategoryService.findByIdFood(food.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailfoodComponent, {
          width: '800px',
          height: '650px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )

  }
}
