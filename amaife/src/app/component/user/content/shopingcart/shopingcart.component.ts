import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";

@Component({
  selector: 'app-shopingcart',
  templateUrl: './shopingcart.component.html',
  styleUrls: ['./shopingcart.component.scss']
})
export class ShopingcartComponent implements OnInit {

  cartList!: Array<Cart>
  p: number | any;
  eStatusCart = EStatusCart;

  constructor(public auth: AuthService,
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
}
