import {Component, Inject, OnInit} from '@angular/core';
import {Oder} from "../../../../../model/order/Oder";
import {EStatusOrder} from "../../../../../model/order/EStatusOrder";
import {OrderDetail} from "../../../../../model/order/OrderDetail";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../../../../service/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodService} from "../../../../../service/food.service";
import {DetailfoodComponent} from "../../food/detailfood/detailfood.component";
import {ActivatedRoute} from "@angular/router";
import {UpdateorderComponent} from "../updateorder/updateorder.component";
import {EPayments} from "../../../../../model/order/EPayments";

@Component({
  selector: 'app-order-qrcode',
  templateUrl: './order-qrcode.component.html',
  styleUrls: ['./order-qrcode.component.scss']
})
export class OrderQrcodeComponent implements OnInit {

  oder!: Oder;
  eStatusOrder = EStatusOrder;
  orderDetailList !: Array<OrderDetail>
  idOrder !: number;
  epaypal = EPayments;

  constructor(private oderService: OrderService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private foodService: FoodService) {
  }

  ngOnInit(): void {
    this.idOrder = this.activatedRoute.snapshot.params['id'];
    this.oderService.findByIdOder(this.idOrder).subscribe(
      (dataOder) => {
        this.oder = dataOder;
        this.oderService.findAllOrderDetailByIdOder(this.oder.id).subscribe(
          dataOrrderDetail => {
            this.orderDetailList = dataOrrderDetail;
            console.log(this.orderDetailList);
          }
        )
      }
    )
  }

  openDetailFood(oder: OrderDetail) {
    this.foodService.findByIdFood(oder.food.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailfoodComponent, {
          width: '800px',
          height: '550px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  upateStatus(oder: Oder) {
    this.oderService.findByIdOder(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UpdateorderComponent, {
          width: '450px',
          height: '350px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }
}
