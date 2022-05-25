import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCartComponent} from "../delete-cart/delete-cart.component";

@Component({
  selector: 'app-shopingcart',
  templateUrl: './shopingcart.component.html',
  styleUrls: ['./shopingcart.component.scss']
})
export class ShopingcartComponent implements OnInit {

  cartList!: Array<Cart>
  p: number | any;
  eStatusCart = EStatusCart;
  quatity: number = 1;

  constructor(public auth: AuthService,
              private dialog: MatDialog,
              public cartService: OrderService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.cartService.findCartUser(this.auth.getUsername()).subscribe(
      dataCart => {
        this.p = 1;
        this.cartList = dataCart;
        console.log(this.cartList)
      }
    );
  }

  quatitycong() {
    if (this.quatity < 51) {
      this.quatity = this.quatity + 1;
    }
  }

  quatitytru() {
    if (this.quatity > 1) {
      this.quatity = this.quatity - 1;
    }
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
    )
  }

  paypal() {
  }
}
