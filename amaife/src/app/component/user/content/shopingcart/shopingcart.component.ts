import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCartComponent} from "../delete-cart/delete-cart.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-shopingcart',
  templateUrl: './shopingcart.component.html',
  styleUrls: ['./shopingcart.component.scss']
})
export class ShopingcartComponent implements OnInit {

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
      }
    );
    // @ts-ignore
    this.cartService.totalMoneyCart(this.auth.getUsername()).subscribe(
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
        });
      }
    );
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
        this.ngOnInit();
      })
  }

  checkout(totalCart: number) {
    if (totalCart == null) {
      this.snackBar.open("Giỏ hàng đang rỗng,vui lòng chọn món", "OK", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
    } else {
      location.replace("/checkout");
    }
  }
}
