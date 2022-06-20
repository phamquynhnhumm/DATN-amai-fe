import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Cart} from "../../../../model/order/Cart";
import {OrderService} from "../../../../service/order.service";

@Component({
  selector: 'app-delete-cart',
  templateUrl: './delete-cart.component.html',
  styleUrls: ['./delete-cart.component.scss']
})
export class DeleteCartComponent implements OnInit {

  cart!: Cart;

  constructor(private dialogRef: MatDialogRef<DeleteCartComponent>,
              private cartService: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.cart = this.data;
  }

  deleteCart() {
    this.cartService.cancelByIdCart(this.cart.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xoá món khỏi giỏ hàng thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }

  cancal() {
    this.dialogRef.close();
  }
}
