import {Component, OnInit} from '@angular/core';
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {AuthService} from "../../../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Oder} from "../../../../model/order/Oder";
import {OrderDetail} from "../../../../model/order/OrderDetail";
import {Food} from "../../../../model/food/Food";
import {Router} from "@angular/router";

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
  totalQuantityCart !: number;
  cartUpdate !: Cart;
  cart !: Cart;
  oder !: Oder;
  newOder!: Oder;
  paypal !: string;

  constructor(public auth: AuthService,
              private dialog: MatDialog,
              private route: Router,
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
    );
    // @ts-ignore
    this.cartService.totalQuantityCart(this.auth.getUsername()).subscribe(
      data => {
        this.totalQuantityCart = data;
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

  formOrder = new FormGroup(
    {
      address: new FormControl('', [Validators.required, Validators.min(0)]),
      phone: new FormControl('', [Validators.required, Validators.min(0)]),
      fullName: new FormControl('', [Validators.required, Validators.min(0)]),
      qrcode: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl('', Validators.required),
      orderDetailList: new FormControl('', [Validators.required, Validators.min(0)]),
      money: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      payments: new FormControl('', [Validators.required, Validators.min(0)]),
    }
  )

  formOrderDEtail = new FormGroup(
    {
      isDeleted: new FormControl('', [Validators.required, Validators.min(0)]),
      orders: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      food: new FormControl('', [Validators.required, Validators.min(0)]),
    }
  )
  listOderDetail: OrderDetail[] = [];


  onSubmit() {
    this.formOrder.value.qrcode = "de tim sau";
    this.formOrder.value.status = "UNCONFIRMED";
    this.formOrder.value.money = this.totalCart;
    this.formOrder.value.quantity = this.totalQuantityCart;
    console.log(this.formOrder.value);
    this.cartService.createOderUser(this.formOrder.value).subscribe(
      (data) => {
        this.newOder = data;
        this.formOrderDEtail.value.orders = this.newOder;
        this.formOrderDEtail.value.isDeleted = false;
        for (let i = 0; i < this.cartList.length; i++) {
          this.cartService.cancelByIdCart(this.cartList[i].id).subscribe();
          let newOderDetail: { quantity: any; isDeleted: any; orders: any; food: Food } = {
            quantity: this.cartList[i].quantity,
            food: this.cartList[i].food,
            orders: this.formOrderDEtail.value.orders,
            isDeleted: this.formOrderDEtail.value.isDeleted,
          };
          console.log(<OrderDetail>newOderDetail);
          this.listOderDetail.push(<OrderDetail>newOderDetail);
        }

        this.cartService.createOderDetailUser(this.listOderDetail).subscribe(
          (datatickte) => {
            console.log("Thêm mới chi tiết món thành công");
          }
        )
        this.route.navigateByUrl("/home").then(() => this.snackBar.open("Đặt món thành công!")._dismissAfter(3000))
      },
    );
  }
}
