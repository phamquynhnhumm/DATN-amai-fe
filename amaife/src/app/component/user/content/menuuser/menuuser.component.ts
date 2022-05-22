import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../../service/food.service";
import {Food} from "../../../../model/food/Food";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.component.html',
  styleUrls: ['./menuuser.component.scss']
})
export class MenuuserComponent implements OnInit {
  foodList!: Array<Food>;
  p: number | any;
  searchSubject = ['Tên món', 'Danh mục'];
  searchss: string = "Chọn thuộc tính";

  constructor(private foodService: FoodService,
              private router: Router,
              private matSnackBar: MatSnackBar,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.foodService.findAllFoodIsdelete_User(false).subscribe(
      datafood => {
        this.p = 1;
        this.foodList = datafood;
        console.log(this.foodList)
      }
    )
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  detailFood(foods: Food) {
    this.router.navigate(['/detailfood/' + foods.id]);
  }

  onCheckboxChangeFood($event: MatOptionSelectionChange<string>, searchs: string) {
    this.searchss = searchs;
  }

  searchFood(search: string) {
    if (this.searchss == this.searchSubject[0]) {
      this.foodService.searcFood(false, search, "", "").subscribe(
        (data) => {
          this.foodList = data;
        },
        (error) => {
          this.foodService.findAllFoodIsdeleteAndFoodCategory(false, false).subscribe(
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
      this.foodService.searcFood(false, "", "", search).subscribe(
        (data) => {
          this.foodList = data;
        },
        (error) => {
          this.foodService.findAllFoodIsdeleteAndFoodCategory(false, false).subscribe(
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
      this.foodService.searcFood(false, "", search, "").subscribe(
        (data) => {
          this.foodList = data;
        },
        (error) => {
          this.foodService.findAllFoodIsdeleteAndFoodCategory(false, false).subscribe(
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

}
