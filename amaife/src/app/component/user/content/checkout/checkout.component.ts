import {Component, OnInit} from '@angular/core';
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {AuthService} from "../../../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
  apppayapl: boolean = false;

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

  formOrder = new FormGroup(
    {
      address: new FormControl('', [Validators.required, Validators.min(0)]),
      phone: new FormControl('', [Validators.required, Validators.min(0)]),
      fullName: new FormControl('', [Validators.required, Validators.min(0)]),
      qrcode: new FormControl(''),
      status: new FormControl(''),
      money: new FormControl(''),
      quantity: new FormControl(''),
      payments: new FormControl('', [Validators.required, Validators.min(0)]),
    }
  )

  formOrderDEtail = new FormGroup(
    {
      isDeleted: new FormControl(''),
      orders: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      food: new FormControl('', [Validators.required, Validators.min(0)]),
    }
  )
  listOderDetail: OrderDetail[] = [];


  onSubmit() {
    if (this.formOrder.value.payments == 'PAYPAL') {
      this.apppayapl = true;
      // this.route.navigateByUrl("/paypal").then();
    } else if (this.formOrder.value.payments == 'CASH') {
      this.formOrder.value.qrcode = "de tim sau";
      this.formOrder.value.status = "UNCONFIRMED";
      this.formOrder.value.money = this.totalCart;
      this.formOrder.value.quantity = this.totalQuantityCart;
      console.log(this.formOrder.value);
      if (this.formOrder.valid) {
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
      } else {
        this.snackBar.open("Đặt món thất bại !")._dismissAfter(3000);
      }
    } else {
      this.snackBar.open("Quý khách đến của hàng an toàn nhé! Chúng tôi sẽ chuẩn bị món ngon cho bạn")._dismissAfter(3000);
    }
  }
}
