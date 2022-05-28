import {Component, Input, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {NavigationExtras, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Oder} from "../../../../model/order/Oder";
import {Food} from "../../../../model/food/Food";
import {OrderDetail} from "../../../../model/order/OrderDetail";
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  @Input() formOrder!: FormGroup;

  @Input() oder!: Oder;
  price1: number = 0.3;
  test!: boolean;
  cartList!: Array<Cart>
  p: number | any;
  eStatusCart = EStatusCart;
  quantity!: number;
  totalCart !: number;
  totalQuantityCart !: number;
  cartUpdate !: Cart;
  cart !: Cart;
  newOder!: Oder;
  paypal !: string;
  apppayapl: boolean = false;

  constructor(private router: Router,
              private orderService: OrderService,
              private snackBar: MatSnackBar,
              private route: Router,
              public cartService: OrderService
  ) {
  }

  ngOnInit(): void {
    console.log(this.formOrder);
    this.initConfig();
  }

  formOrderDEtail = new FormGroup(
    {
      isDeleted: new FormControl(''),
      orders: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      food: new FormControl('', [Validators.required, Validators.min(0)]),
    }
  )
  listOderDetail: OrderDetail[] = [];

  private initConfig(): Object {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest><unknown>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.price1,
            },
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onClientAuthorization: (data) => {
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
      },
      onCancel: (data, actions) => {
        alert("Giao dịch của quý khách không hoàn thành");
      },
      onError: err => {
        alert("Paypal đăng gặp trục trặc mong bản hãy thử lại sau!")
      },
      onClick: (data, actions) => {
      },
    };
    return this.payPalConfig;
  };
}

