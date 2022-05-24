import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {Oder} from "../../../../model/order/Oder";
import {EStatusOrder} from "../../../../model/order/EStatusOrder";
import {DetailorderComponent} from "../../../admin/content/order/detailorder/detailorder.component";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailUserComponent} from "../order-detail-user/order-detail-user.component";

@Component({
  selector: 'app-orderuser',
  templateUrl: './orderuser.component.html',
  styleUrls: ['./orderuser.component.scss']
})
export class OrderuserComponent implements OnInit {
  userName!: string | null;
  orderList !: Array<Oder>;
  p: number | any;
  eStatusOrder = EStatusOrder;

  constructor(public authService: AuthService,
              private orderService: OrderService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.userName = this.authService.getUsername();
    // @ts-ignore
    this.orderService.findOderUser("thanhthuy").subscribe(
      dataorder => {
        this.p = 1;
        this.orderList = dataorder;
      }
    );
  }

  openDetailOrder(oder: Oder) {
    console.log(oder.id);
    this.orderService.findByIdOderUser(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(OrderDetailUserComponent, {
          width: '800px',
          height: '580px',
          data: data
        });
        console.log("ddang xem chi tiet orrder")
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }
}
