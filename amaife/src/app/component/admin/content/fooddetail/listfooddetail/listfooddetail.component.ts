import {Component, OnInit} from '@angular/core';
import {Food} from "../../../../../model/food/Food";
import {EStatusFood} from "../../../../../model/food/EStatusFood";
import {FoodService} from "../../../../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatOptionSelectionChange} from "@angular/material/core";
import {DeletefoodComponent} from "../../food/deletefood/deletefood.component";
import {DetailfoodComponent} from "../../food/detailfood/detailfood.component";
import {FoodDetail} from "../../../../../model/food/FoodDetail";
import {DetailmaterialComponent} from "../../material/detailmaterial/detailmaterial.component";
import {DetailfooddetailComponent} from "../detailfooddetail/detailfooddetail.component";
import {DeletefooddetailComponent} from "../deletefooddetail/deletefooddetail.component";
import {EditfooddetailComponent} from "../editfooddetail/editfooddetail.component";

@Component({
  selector: 'app-listfooddetail',
  templateUrl: './listfooddetail.component.html',
  styleUrls: ['./listfooddetail.component.scss']
})
export class ListfooddetailComponent implements OnInit {

  fooddetailList!: Array<FoodDetail>;
  p: number | any;
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
    this.foodDetailService.findAllFoodDetailIsdelete(false).subscribe(
      data => {
        this.p = 1;
        console.log(this.fooddetailList)
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

  searchFoodDetail(search: string) {
    if (this.searchss == this.searchSubject[0]){
      console.log("tìm kiếm theo tên món")
      this.foodDetailService.searchFoodDetailFoodandMaterial(false, false, false, search, '').subscribe(
        (data) => {
          console.log(data)
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
    if (this.searchss == this.searchSubject[1]) {
      console.log("tìm kiếm theo tên nguyên liệu")
      this.foodDetailService.searchFoodDetailFoodandMaterial(false, false, false, "", search).subscribe(
        (data) => {
          console.log(data)
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
    this.foodDetailService.findByIdFoodDetail(fooddetail.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(EditfooddetailComponent, {
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

  openDeleteFoodDetail(fooddetail: FoodDetail) {
    this.foodDetailService.findByIdFoodDetail(fooddetail.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DeletefooddetailComponent, {
          width: '400px',
          height: '350px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  openDetailFoodDetail(fooddetail: FoodDetail) {
    this.foodDetailService.findByIdFoodDetail(fooddetail.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailfooddetailComponent, {
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
