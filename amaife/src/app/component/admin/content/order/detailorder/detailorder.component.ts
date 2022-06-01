import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Oder} from "../../../../../model/order/Oder";
import {OrderService} from "../../../../../service/order.service";
import {EStatusOrder} from "../../../../../model/order/EStatusOrder";
import {OrderDetail} from "../../../../../model/order/OrderDetail";
import {DetailfoodComponent} from "../../food/detailfood/detailfood.component";
import {FoodService} from "../../../../../service/food.service";

@Component({
  selector: 'app-detailorder',
  templateUrl: './detailorder.component.html',
  styleUrls: ['./detailorder.component.scss']
})
export class DetailorderComponent implements OnInit {

  oder!: Oder;
  eStatusOrder = EStatusOrder;
  orderDetailList !: Array<OrderDetail>

  constructor(private dialogRef: MatDialogRef<DetailorderComponent>,
              private oderService: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private foodService: FoodService
  ) {
  }

  ngOnInit(): void {
    this.oder = this.data;
    console.log(this.oder.id)
    this.oderService.findAllOrderDetailByIdOder(this.data.id).subscribe(
      dataOrrderDetail => {
        this.orderDetailList = dataOrrderDetail;
        console.log(this.orderDetailList);
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

  cancel() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi đơn hàng thành công", "OK", {
      duration: 4000
    })
  }
}
