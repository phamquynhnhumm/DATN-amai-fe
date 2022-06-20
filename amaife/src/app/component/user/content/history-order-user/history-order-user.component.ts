import {Component, OnInit} from '@angular/core';
import {Oder} from "../../../../model/order/Oder";
import {EStatusOrder} from "../../../../model/order/EStatusOrder";
import {OrderDetail} from "../../../../model/order/OrderDetail";
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailUserComponent} from "../order-detail-user/order-detail-user.component";

@Component({
  selector: 'app-history-order-user',
  templateUrl: './history-order-user.component.html',
  styleUrls: ['./history-order-user.component.scss']
})
export class HistoryOrderUserComponent implements OnInit {
  userName!: string | null;
  orderList !: Array<Oder>;
  order!: Oder;
  orderDetailList !: Array<OrderDetail>;
  p: number | any;
  eStatusOrder = EStatusOrder;
  idOrder !: number;

  constructor(public authService: AuthService,
              private orderService: OrderService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.userName = this.authService.getUsername();
    // @ts-ignore
    this.orderService.findOderUser(this.userName).subscribe(
      dataorder => {
        this.p = 1;
        this.orderList = dataorder;
      }
    );
    this.orderService.findOderDetailUser(4).subscribe(
      dataOrrderDetail => {
        this.orderDetailList = dataOrrderDetail;
      }
    )
  }

  openDetailOrder(oder: Oder) {
    this.orderService.findByIdOderUser(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(OrderDetailUserComponent, {
          width: '800px',
          height: '500px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  openCancelOrder(oder: Oder) {
    this.order.status = <EStatusOrder>'CANCEL';
    this.orderService.updateOder(this.order).subscribe(data => {
        this.snackBar.open("Hủy đơn hàng thành công", "OK", {
          duration: 4000
        })
      }
    )
  }

  detailFood(oderDetail: OrderDetail
  ) {
    this.router.navigate(['/detailfood/' + oderDetail.food.id]);
  }
}
