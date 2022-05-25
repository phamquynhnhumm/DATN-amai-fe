import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {Oder} from "../../../../model/order/Oder";
import {EStatusOrder} from "../../../../model/order/EStatusOrder";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailUserComponent} from "../order-detail-user/order-detail-user.component";
import {OrderDetail} from "../../../../model/order/OrderDetail";
import {Food} from "../../../../model/food/Food";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  idOrder !: number;

  constructor(public authService: AuthService,
              private orderService: OrderService, private router: Router, private snackBar: MatSnackBar,
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
    oder.status = <EStatusOrder>'CANCEL';
    this.orderService.updateOderUser(oder).subscribe(data => {
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
