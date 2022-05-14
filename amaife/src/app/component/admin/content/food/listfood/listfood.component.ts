import {Component, OnInit} from '@angular/core';
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FoodService} from "../../../../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DetailfoodcategoryComponent} from "../../foodcategory/detailfoodcategory/detailfoodcategory.component";
import {Food} from "../../../../../model/food/Food";
import {EStatusFood} from "../../../../../model/food/EStatusFood";
import {EditfoodComponent} from "../editfood/editfood.component";
import {DetailfoodComponent} from "../detailfood/detailfood.component";
import {DeletefoodComponent} from "../deletefood/deletefood.component";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-listfood',
  templateUrl: './listfood.component.html',
  styleUrls: ['./listfood.component.scss']
})
export class ListfoodComponent implements OnInit {
  foodList!: Array<Food>;
  p: number | any;
  eStatusFood = EStatusFood;
  searchSubject = ['Tên món', 'Danh mục', 'Đơn vị tính'];
  searchss: string ="Chọn thuộc tính";

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  dtOptions: DataTables.Settings = {};
  food!: Food;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.foodService.findAllFoodIsdelete(false).subscribe(
      data => {
        this.p = 1;
        this.foodList = data;
      }
    )
  }

  onCheckboxChangeFood($event: MatOptionSelectionChange<string>, searchs: string) {
    this.searchss = searchs;
    console.log(this.searchss)
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  openEditFood(food: Food) {
    this.foodService.findByIdFood(food.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(EditfoodComponent, {
          width: '800px',
          height: '550px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDeleteFood(food: Food) {
    this.foodService.findByIdFood(food.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DeletefoodComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDetailFood(food: Food) {
    this.foodService.findByIdFood(food.id).subscribe(
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

  searchFood(search: string) {
    if (this.searchss == this.searchSubject[0]) {
      console.log("tìm kiếm theo tên món")
      this.foodService.searcFood(false, search, "", "").subscribe(
        (data) => {
          console.log(data)
          this.foodList = data;
        },
        (error) => {
          this.foodService.findAllFoodIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.foodList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[1]) {
      console.log("tìm danh mục ")
      this.foodService.searcFood(false, "", "", search).subscribe(
        (data) => {
          console.log(data)
          this.foodList = data;
        },
        (error) => {
          this.foodService.findAllFoodIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.foodList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[2]) {
      console.log("tìm kiếm theo đơn vị tính")
      this.foodService.searcFood(false, "",search, "").subscribe(
        (data) => {
          console.log(data)
          this.foodList = data;
        },
        (error) => {
          this.foodService.findAllFoodIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.foodList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
  }

  openFoodCategory(food: Food) {
    this.foodService.findByIdFoodCategory(food.foodCategory.id).subscribe(
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

}
