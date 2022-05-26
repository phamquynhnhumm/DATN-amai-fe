import {Component, OnInit} from '@angular/core';
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {AuthService} from "../../../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";
import {DeleteCartComponent} from "../delete-cart/delete-cart.component";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartList!: Array<Cart>
  p: number | any;
  eStatusCart = EStatusCart;
  quantity!: number;
  totalCart !: number;
  cartUpdate !: Cart;
  cart !: Cart;

  constructor(public auth: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              public cartService: OrderService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.cartService.findCartUser(this.auth.getUsername()).subscribe(
      dataCart => {
        this.p = 1;
        this.cartList = dataCart;
        console.log(dataCart)
      }
    );
    // @ts-ignore
    this.cartService.totalMoneyCart(this.auth.getUsername(), 'INSGOPPING').subscribe(
      data => {
        this.totalCart = data;
      }
    )
  }

  checkoutForm = new FormGroup(
    {
      phone: new FormControl('', [Validators.required, Validators.min(0)]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      qrcode: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      status: new FormControl('', [Validators.required, Validators.min(0)]),
      orderDetailList: new FormArray([]),
      money: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    }
  )

  paypal() {
  }

  onSubmit() {
  }

  delteCartShopping() {
    for (let i = 0; i < this.cartList.length; i++) {
      this.cart = this.cartList[i];
      /**
       * Xóa cart khỏi giỏ hàng
       */
      this.cartService.cancelByIdCart(this.cart.id).subscribe();
      /**
       * Đồng thời thêm chi tiết đơn hàng;
       */
      // this.cartService.
    }
  }
}
