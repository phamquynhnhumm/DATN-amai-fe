import {Component, Inject, OnInit} from '@angular/core';
import {Material} from "../../../../../model/food/Material";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../../service/order.service";
import {Oder} from "../../../../../model/order/Oder";

@Component({
  selector: 'app-deleteorder',
  templateUrl: './deleteorder.component.html',
  styleUrls: ['./deleteorder.component.scss']
})
export class DeleteorderComponent implements OnInit {

  oder!: Oder;

  constructor(private dialogRef: MatDialogRef<DeleteorderComponent>,
              private oderService: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.oder = this.data;
  }

  deleteMaterial() {
    this.oderService.deleteByIdOder(this.oder.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xóa đơn hàng thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
