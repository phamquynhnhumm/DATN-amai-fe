import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../../service/food.service";
import {Food} from "../../../../model/food/Food";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatOptionSelectionChange} from "@angular/material/core";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {OrderService} from "../../../../service/order.service";

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.component.html',
  styleUrls: ['./menuuser.component.scss']
})
export class MenuuserComponent implements OnInit {
  foodList!: Array<Food>;
  p: number | any;
  searchSubject = ['Tên món', 'Danh mục'];
  sortSubject = ['Theo tên', 'Theo danh mục', 'Theo giá'];
  searchss: string = "Chọn thuộc tính";
  sorts: string = "Sắp xếp";
  formCart!: FormGroup;
  quatity: number = 1;
  eStatusCart = EStatusCart;


  constructor(private foodService: FoodService,
              private router: Router,
              private matSnackBar: MatSnackBar,
              private fb: FormBuilder,
              private createService: OrderService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // danh sách món có isDelete =  false and FoodCategory : isDelete = false
    this.foodService.findAllFoodIsdeleteAndFoodCategoryUer(false, false).subscribe(
      datafood => {
        this.p = 1;
        this.foodList = datafood;
      }
    )
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  SortForm = this.fb.group({
    nameSort: ['', Validators.maxLength(100)],
  });

  detailFood(foods: Food) {
    location.replace("/DATN-amai-fe/amaife/detailfood/" + foods.id);
    // this.router.navigate(['/DATN-amai-fe/amaife/detailfood/' + foods.id]);
  }

  onCheckboxChangeFood($event: MatOptionSelectionChange<string>, searchs: string) {
    this.searchss = searchs;
  }

  onCheckboxChangeSort($event: MatOptionSelectionChange<string>, sort: string) {
    this.sorts = sort;
  }

  searchFood(search: string) {
    if (this.searchss == this.searchSubject[0]) {
      this.foodService.searcFoodUser(false, search, "").subscribe(
        (data) => {
          this.foodList = data;
        },
        (error) => {
          this.foodService.findAllFoodIsdeleteAndFoodCategoryUer(false, false).subscribe(
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
      this.foodService.searcFoodUser(false, "", search).subscribe(
        (data) => {
          this.foodList = data;
        },
        (error) => {
          this.foodService.findAllFoodIsdeleteAndFoodCategoryUer(false, false).subscribe(
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

  createCartShoping(foods: Food) {
    this.formCart = new FormGroup(
      {
        quantity: new FormControl(this.quatity, Validators.required),
        status: new FormControl(this.eStatusCart.INSGOPPING, Validators.required),
        food: new FormControl(foods, Validators.required),
        money: new FormControl(foods.price * this.quatity, Validators.required),
      })
    this.createService.createCartUser(this.formCart.value).subscribe(
      (data) => {
        this.snackBar.open("Thêm vào giỏ hàng thành công!", "OK")._dismissAfter(3000);
      },
      error => {
        this.snackBar.open("Thêm vào giỏ hàng thấy bại !")._dismissAfter(3000);
      });
  }

  SortFood() {
    if (this.sorts == this.sortSubject[0]) {
      this.foodService.OrderByNameACS().subscribe(
        datafood => {
          this.p = 1;
          this.foodList = datafood;
        }, error => {
          this.foodService.findAllFoodIsdeleteAndFoodCategoryUer(false, false).subscribe(
            datafood => {
              this.p = 1;
              this.foodList = datafood;
            }
          )
          this.matSnackBar.open("Sắp xếp theo tên không thành công!")._dismissAfter(3000)
        }
      )
    } else if (this.sorts == this.sortSubject[1]) {
      this.foodService.OrderByFoodCategoryACS().subscribe(
        datafood => {
          this.p = 1;
          this.foodList = datafood;
        }, error => {
          this.foodService.findAllFoodIsdeleteAndFoodCategoryUer(false, false).subscribe(
            datafood => {
              this.p = 1;
              this.foodList = datafood;
            }
          )
          this.matSnackBar.open("Sắp xếp theo danh mục không thành công!")._dismissAfter(3000)
        }
      )
    } else if (this.sorts == this.sortSubject[2]) {
      this.foodService.OrderByPriceACS().subscribe(
        datafood => {
          this.p = 1;
          this.foodList = datafood;
        }, error => {
          this.foodService.findAllFoodIsdeleteAndFoodCategoryUer(false, false).subscribe(
            datafood => {
              this.p = 1;
              this.foodList = datafood;
            }
          )
          this.matSnackBar.open("Sắp xếp theo giá không thành công!")._dismissAfter(3000)
        }
      )
    }
  }
}
