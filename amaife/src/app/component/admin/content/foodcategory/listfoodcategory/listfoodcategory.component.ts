import {Component, OnInit} from '@angular/core';
import {EditfoodcategoryComponent} from "../editfoodcategory/editfoodcategory.component";
import {MatDialog} from "@angular/material/dialog";
import {data} from "jquery";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {ActivatedRoute} from "@angular/router";
import {DELETE} from "@angular/cdk/keycodes";
import {DetailfoodcategoryComponent} from "../detailfoodcategory/detailfoodcategory.component";
import {DelatefoodcategoryComponent} from "../delatefoodcategory/delatefoodcategory.component";
import {FoodService} from "../../../../../service/food.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-listfoodcategory',
  templateUrl: './listfoodcategory.component.html',
  styleUrls: ['./listfoodcategory.component.scss']
})
export class ListfoodcategoryComponent implements OnInit {

  foodCategoryList!: Array<FoodCategory>;
  p: number | any;

  constructor(
    private foodcategoryService: FoodService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  dtOptions: DataTables.Settings = {};
  foodcategory!: FoodCategory;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.foodcategoryService.findAllFoodCategoryIsdelete(false).subscribe(
      data => {
        this.p = 1;
        this.foodCategoryList = data;
      }
    )
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });


  openEditFoodCategory(foodcategory: FoodCategory) {
    this.foodcategoryService.findByIdFoodCategory(foodcategory.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(EditfoodcategoryComponent, {
          width: '300px',
          height: '350px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDeleteFoodCategory(foodcategory: FoodCategory) {
    this.foodcategoryService.findByIdFoodCategory(foodcategory.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DelatefoodcategoryComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDetailFoodCategory(foodcategory: FoodCategory) {
    this.foodcategoryService.findByIdFoodCategory(foodcategory.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailfoodcategoryComponent, {
          width: '400px',
          height: '450px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  searchFoodCategory(search: string) {
    console.log(search)
    this.foodcategoryService.searchNameandisDeleteFoodCategory(false, search).subscribe(
      (data) => {
        console.log(data)
        this.foodCategoryList = data;
      },
      (error) => {
        this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
      }
    );
  }
}
