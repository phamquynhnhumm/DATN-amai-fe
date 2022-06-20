import {Component, Input, OnInit, Output} from '@angular/core';
import {Food} from "../../../../model/food/Food";
import {FoodService} from "../../../../service/food.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {OrderService} from "../../../../service/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegistrationService} from "../../../../service/registration.service";

@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.scss']
})
export class HomeuserComponent implements OnInit {

  foodList!: Array<Food>;
  p: number | any;
  formCart!: FormGroup;
  quatity: number = 1;
  eStatusCart = EStatusCart;

  constructor(private foodService: FoodService,
              private router: Router,
              private createService: OrderService,
              private snackBar: MatSnackBar,
              private registrationService: RegistrationService
  ) {
  }

  ngOnInit(): void {
    this.foodService.findAllFoodIsdelete_User(false).subscribe(
      datafood => {
        this.p = 1;
        this.foodList = datafood;
      }
    );
  }

  formCLass = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      phone: new FormControl('', [Validators.required, Validators.pattern("((09|03|07|08|05)+([0-9]{8})\\b)")]),
      content: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    }
  )

  detailFood(foods: Food) {
    this.router.navigate(['/detailfood/' + foods.foodCategory.id]);
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
        this.snackBar.open("Thêm vào giỏ hàng thành công! ", "OK", {
          duration: 4000
        })
        this.ngOnInit();
      },
      error => {
        this.snackBar.open("Thêm vào giỏ hàng thấy bại ! ", "OK", {
          duration: 3000
        })
      });
  }

  onSubmit() {
    if (this.formCLass.valid) {
      this.registrationService.createRegistration(this.formCLass.value).subscribe(
        data => {
          this.snackBar.open("Đăng ký thành công !", "OK")._dismissAfter(3000);
        }, error => {
          this.snackBar.open("Đăng ký thấy bại! Vui lòng kiểm tra lại thông tin")._dismissAfter(3000);
        }
      )
    } else {
      this.snackBar.open("Đăng ký thấy bại! Vui lòng kiểm tra lại thông tin", "OK", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
    }
  }
}
