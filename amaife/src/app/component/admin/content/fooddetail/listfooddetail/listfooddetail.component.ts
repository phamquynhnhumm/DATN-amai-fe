import { Component, OnInit } from '@angular/core';
import {Food} from "../../../../../model/food/Food";
import {EStatusFood} from "../../../../../model/food/EStatusFood";
import {FoodService} from "../../../../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatOptionSelectionChange} from "@angular/material/core";
import {EditfoodComponent} from "../../food/editfood/editfood.component";
import {DeletefoodComponent} from "../../food/deletefood/deletefood.component";
import {DetailfoodComponent} from "../../food/detailfood/detailfood.component";
import {DetailfoodcategoryComponent} from "../../foodcategory/detailfoodcategory/detailfoodcategory.component";
import {FoodDetail} from "../../../../../model/food/FoodDetail";
import {DetailmaterialComponent} from "../../material/detailmaterial/detailmaterial.component";

@Component({
  selector: 'app-listfooddetail',
  templateUrl: './listfooddetail.component.html',
  styleUrls: ['./listfooddetail.component.scss']
})
export class ListfooddetailComponent implements OnInit {

  fooddetailList!: Array<FoodDetail>;
  p: number | any;
  eStatusFood = EStatusFood;
  searchSubject = ['Tên món', 'Tên nguyên liệu'];
  searchss: string = "Chọn thuộc tính";

  constructor(
    private foodDetailService: FoodService,
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
    this.foodDetailService.findAllFoodDetailIsdelete(false).subscribe(
      data => {
        this.p = 1;
        this.fooddetailList = data;
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
    this.foodDetailService.findByIdFood(food.id).subscribe(
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
    this.foodDetailService.findByIdFood(food.id).subscribe(
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

  openDetailFood(fooddetail: FoodDetail) {
    this.foodDetailService.findByIdFood(fooddetail.food.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailfoodComponent, {
          width: '800px',
          height: '580px',
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
      this.foodDetailService.searchFoodDetailFoodandMaterial(false, false, false,search,'').subscribe(
        (data) => {
          this.fooddetailList = data;
        },
        (error) => {
          this.foodDetailService.findAllFoodDetailIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.fooddetailList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    // if (this.searchss == this.searchSubject[1]) {
    //   console.log("tìm danh mục ")
    //   this.foodService.searcFood(false, "", "", search).subscribe(
    //     (data) => {
    //       this.fooddetailList = data;
    //     },
    //     (error) => {
    //       this.foodService.findAllFoodIsdelete(false).subscribe(
    //         data => {
    //           this.p = 1;
    //           this.fooddetailList = data;
    //         }
    //       )
    //       this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
    //     }
    //   );
    // }
    // if (this.searchss == this.searchSubject[2]) {
    //   console.log("tìm kiếm theo đơn vị tính")
    //   this.foodService.searcFood(false, "", search, "").subscribe(
    //     (data) => {
    //       this.fooddetailList = data;
    //     },
    //     (error) => {
    //       this.foodService.findAllFoodIsdelete(false).subscribe(
    //         data => {
    //           this.p = 1;
    //           this.fooddetailList = data;
    //         }
    //       )
    //       this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
    //     }
    //   );
    // }
  }

  openFoodCategory(food: Food) {
    this.foodDetailService.findByIdFoodCategory(food.foodCategory.id).subscribe(
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

  openDetailMaterial(fooddetail: FoodDetail) {
    this.foodDetailService.findByIdMaterial(fooddetail.id).subscribe(
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

  openEditFoodDetail(fooddetail: FoodDetail) {

  }

  openDeleteFoodDetail(fooddetail: FoodDetail) {

  }
}
