import { Component, OnInit } from '@angular/core';
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {AuthService} from "../../../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";
import {DeleteCartComponent} from "../delete-cart/delete-cart.component";

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

  deleteCart(cart: Cart) {
    this.cartService.findByIdCart(cart.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DeleteCartComponent, {
          width: '400px',
          height: '280px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
          location.replace("/shoping");
        });
      }
    );
  }

  paypal() {

  }

  updatequantityCart(cart: Cart, quantity: number) {
    console.log(quantity);
    console.log(cart);
  }

  /**
   * Change () tương tác xong ấn enter xong mới thực hiện
   * Click () nó lấy giá trị ngay thời điểm đó
   * Cập nhật  lại số lượng và tổng tiền trong giỏ hàng
   * @param cart
   * @param quantity
   */
  total(cart: Cart, quantity: number) {
    console.log(quantity);
    console.log(cart);
    this.cartUpdate = cart;
    this.cartUpdate.quantity = quantity;
    this.cartUpdate.money = quantity * cart.food.price;
    this.cartService.updateCart(this.cartUpdate).subscribe(
      (data) => {
        this.snackBar.open("Cập nhật số lượng thành công!")._dismissAfter(3000);
        location.replace("/shoping");
      },
      error => {
        this.snackBar.open("Cập nhật số lượng thấy bại !")._dismissAfter(3000);
      });
  }
}
