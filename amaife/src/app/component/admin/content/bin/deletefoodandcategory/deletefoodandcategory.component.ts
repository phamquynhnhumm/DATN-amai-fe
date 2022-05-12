import {Component, OnInit} from '@angular/core';
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FoodService} from "../../../../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {EditfoodcategoryComponent} from "../../foodcategory/editfoodcategory/editfoodcategory.component";
import {DelatefoodcategoryComponent} from "../../foodcategory/delatefoodcategory/delatefoodcategory.component";
import {DetailfoodcategoryComponent} from "../../foodcategory/detailfoodcategory/detailfoodcategory.component";
import {UndofoodandcategoryComponent} from "../undofoodandcategory/undofoodandcategory.component";
import {Food} from "../../../../../model/food/Food";

@Component({
  selector: 'app-deletefoodandcategory',
  templateUrl: './deletefoodandcategory.component.html',
  styleUrls: ['./deletefoodandcategory.component.scss']
})
export class DeletefoodandcategoryComponent implements OnInit {

  foodCategoryList!: Array<FoodCategory>;
  foodList!: Array<Food>;
  p: number | any;
  pfood: number | any;

  constructor(
    private foodandcategoryService: FoodService,
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
    //Danh sách danh mục đã bị xóa
    this.foodandcategoryService.findAllFoodCategoryIsdelete(true).subscribe(
      data => {
        this.p = 1;
        this.foodCategoryList = data;
        console.log(this.foodCategoryList)
      }
    );
    this.foodandcategoryService.findAllFood().subscribe(
      datafood => {
        this.pfood = 1;
        this.foodList = datafood;
        console.log(this.foodList)
      }
    )
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  openUnDeleteFoodCategory(foodcategory: FoodCategory) {
    this.foodandcategoryService.findByIdFoodCategory(foodcategory.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UndofoodandcategoryComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openUnDeleteFood(food: Food) {
    this.foodandcategoryService.findByIdFood(food.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UndofoodandcategoryComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
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
