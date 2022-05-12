import {Component, OnInit} from '@angular/core';
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FoodService} from "../../../../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {EditfoodcategoryComponent} from "../../foodcategory/editfoodcategory/editfoodcategory.component";
import {data} from "jquery";
import {DelatefoodcategoryComponent} from "../../foodcategory/delatefoodcategory/delatefoodcategory.component";
import {DetailfoodcategoryComponent} from "../../foodcategory/detailfoodcategory/detailfoodcategory.component";
import {Food} from "../../../../../model/food/Food";
import {EStatusFood} from "../../../../../model/food/EStatusFood";

@Component({
  selector: 'app-listfood',
  templateUrl: './listfood.component.html',
  styleUrls: ['./listfood.component.scss']
})
export class ListfoodComponent implements OnInit {

  foodList!: Array<Food>;
  p: number | any;
  eStatusFood = EStatusFood;

  constructor(
    private foodService: FoodService,
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
    this.foodService.findAllFoodIsdelete(false).subscribe(
      data => {
        this.p = 1;
        this.foodList = data;
        console.log(this.foodList)
      }
    )
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });


  openEditFoodCategory(food: Food) {
    const dialogRef = this.dialog.open(EditfoodcategoryComponent, {
      width: '300px',
      height: '250px',
      data: data
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openDeleteFoodCategory(food: Food) {
    const dialogRef = this.dialog.open(DelatefoodcategoryComponent, {
      width: '450px',
      height: '250px',
      data: data
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openDetailFoodCategory(food: Food) {
    const dialogRef = this.dialog.open(DetailfoodcategoryComponent, {
      width: '400px',
      height: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  searchFoodCategory(search: string) {
    console.log(search)
    // this.bookingService.getBySearch(search).subscribe(
    //   (data) => {
    //     this.bookingList = data;
    //   },
    //   (error) => {
    //     this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
    //   }
    // );
  }
}
