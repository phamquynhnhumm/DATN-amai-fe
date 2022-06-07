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
import {data} from "jquery";
import {signOut} from "@angular/fire/auth";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

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
  OderQR!: Oder;
  paypal !: string;
  apppayapl: boolean = false;
  QR !: string;
  url: string = "";
  selectedFile: File | any;

  constructor(public auth: AuthService,
              private dialog: MatDialog,
              private route: Router,
              private snackBar: MatSnackBar,
              public cartService: OrderService,
              private angularFireStorage: AngularFireStorage
  ) {
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
      address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
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
      this.route.navigateByUrl("/paypal").then();
    } else if (this.formOrder.value.payments == 'CASH') {
      this.formOrder.value.qrcode = "null";
      this.formOrder.value.status = "UNCONFIRMED";
      this.formOrder.value.money = this.totalCart;
      this.formOrder.value.quantity = this.totalQuantityCart;
      if (this.formOrder.valid) {
        //Tiép tục thực hiện thêm mới Order
        this.cartService.createOderUser(this.formOrder.value).subscribe(
          (data) => {
            this.OderQR = data;
            this.cartService.createQRCode(this.OderQR).subscribe(
              (dataQRcode) => {
                this.snackBar.open("Vui lòng kiểm tra mail về thông tin đơn hàng đã đặt!")._dismissAfter(3000);
              }
              , error => {
                this.snackBar.open("Cập nhật mã QR thất bại!", "OK", {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-warn']
                })
              })
            this.newOder = data;
            this.formOrderDEtail.value.orders = this.newOder;
            this.formOrderDEtail.value.isDeleted = false;
            for (let i = 0; i < this.cartList.length; i++) {
              //Chạy vòng for đê5
              //khi đã đặt hàng thành công thì thực hiện xóa món khỏi gio hàng
              this.cartService.cancelByIdCart(this.cartList[i].id).subscribe();
              let newOderDetail: { quantity: any; isDeleted: any; orders: any; food: Food } = {
                quantity: this.cartList[i].quantity,
                food: this.cartList[i].food,
                orders: this.formOrderDEtail.value.orders,
                isDeleted: this.formOrderDEtail.value.isDeleted,
              };
              this.listOderDetail.push(<OrderDetail>newOderDetail);
            }
            this.cartService.createOderDetailUser(this.listOderDetail).subscribe()
            this.route.navigateByUrl("/home").then(() => this.snackBar.open("Đặt món thành công!")._dismissAfter(3000))
          },
        );
      } else {
        this.snackBar.open("Đặt món thất bại! Vui lòng nhập thông tin", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        })
      }
    } else if (this.formOrder.value.payments == 'NO') {
      this.formOrder.value.qrcode = "null";
      this.formOrder.value.status = "UNCONFIRMED";
      this.formOrder.value.money = this.totalCart;
      this.formOrder.value.quantity = this.totalQuantityCart;
      if (this.formOrder.valid) {
        //Tiép tục thực hiện thêm mới Order
        this.cartService.createOderUser(this.formOrder.value).subscribe(
          (data) => {
            this.OderQR = data;
            this.cartService.createQRCode(this.OderQR).subscribe(
              (dataQRcode) => {
                this.snackBar.open("Vui lòng kiểm tra mail về thông tin đơn hàng đã đặt!")._dismissAfter(3000);
              }
              , error => {
                this.snackBar.open("Cập nhật mã QR thất bại!", "OK", {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-warn']
                })
              })
            this.newOder = data;
            this.formOrderDEtail.value.orders = this.newOder;
            this.formOrderDEtail.value.isDeleted = false;
            for (let i = 0; i < this.cartList.length; i++) {
              //Chạy vòng for đê5
              //khi đã đặt hàng thành công thì thực hiện xóa món khỏi gio hàng
              this.cartService.cancelByIdCart(this.cartList[i].id).subscribe();
              let newOderDetail: { quantity: any; isDeleted: any; orders: any; food: Food } = {
                quantity: this.cartList[i].quantity,
                food: this.cartList[i].food,
                orders: this.formOrderDEtail.value.orders,
                isDeleted: this.formOrderDEtail.value.isDeleted,
              };
              this.listOderDetail.push(<OrderDetail>newOderDetail);
            }
            this.cartService.createOderDetailUser(this.listOderDetail).subscribe()
            this.route.navigateByUrl("/home").then(() =>
              this.snackBar.open(" Đặt món thành công!. Quý khách đến của hàng an toàn nhé! Chúng tôi sẽ chuẩn bị món ngon cho bạn")._dismissAfter(3000));
          },
        );
      } else {
        this.snackBar.open("Đặt món thất bại ! Vui lòng nhập thông tin", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        })
      }
    } else {
      this.snackBar.open("Vui lòng chọn phương thức thanh toán", "OK", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
    }
  }
}
