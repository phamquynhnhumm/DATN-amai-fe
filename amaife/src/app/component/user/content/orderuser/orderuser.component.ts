import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {Oder} from "../../../../model/order/Oder";
import {EStatusOrder} from "../../../../model/order/EStatusOrder";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailUserComponent} from "../order-detail-user/order-detail-user.component";
import {OrderDetail} from "../../../../model/order/OrderDetail";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CancelorderComponent} from "../cancelorder/cancelorder.component";

@Component({
  selector: 'app-orderuser',
  templateUrl: './orderuser.component.html',
  styleUrls: ['./orderuser.component.scss']
})
export class OrderuserComponent implements OnInit {
  userName!: string | null;
  orderList !: Array<Oder>;
  order!: Oder;
  orderDetailList !: Array<OrderDetail>;
  p: number | any;
  eStatusOrder = EStatusOrder;

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
        console.log(dataorder)
      }
    );
  }

  openDetailOrder(oder: Oder) {
    this.orderService.findByIdOderUser(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(OrderDetailUserComponent, {
          width: '900px',
          height: '680px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  openCancelOrder(oder: Oder) {
    this.orderService.findByIdOderUser(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(CancelorderComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  detailFood(oderDetail: OrderDetail
  ) {
    this.router.navigate(['/detailfood/' + oderDetail.food.id]);
  }
}
