import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {Oder} from "../../../../../model/order/Oder";
import {OrderService} from "../../../../../service/order.service";
import {EStatusOrder} from "../../../../../model/order/EStatusOrder";

@Component({
  selector: 'app-updateorder',
  templateUrl: './updateorder.component.html',
  styleUrls: ['./updateorder.component.scss']
})
export class UpdateorderComponent implements OnInit {

  oder!: Oder;
  eStatusOrder = ['UNCONFIRMED', 'CONFIRMED','TRANSPORT','RECEIVED','CANCEL']

  constructor(
    private dialogRef: MatDialogRef<UpdateorderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private oderService: OrderService) {
  }

  formFoodOder!: FormGroup;

  ngOnInit(): void {
    this.oder = this.data;
    this.formFoodOder = new FormGroup(
      {
        status: new FormControl(this.data.status, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        isDeleted: new FormControl(this.data.isDeleted),
      }
    );
  }

  bolen: boolean = false;

  cencal() {
    this.bolen = true;
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật đơn hàng", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    /**
     * Trách trường hợp isDelete null
     */
    if (this.formFoodOder.value.isDeleted) {
      this.formFoodOder.value.isDeleted = true;
    } else {
      this.formFoodOder.value.isDeleted = false;
    }
    if (this.formFoodOder.valid) {
      console.log( this.formFoodOder.value)
      this.oder.status = this.formFoodOder.value.status;
      if (!this.bolen) {
        this.oder.isDeleted = this.formFoodOder.value.isDeleted;
        this.oderService.updateOder(this.oder).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật đơn hàng thành công", "OK", {
              duration: 4000
            })
          }
        )
      }
    } else {
      this.snackBar.open("Cập nhật thấy bại !")._dismissAfter(3000);
    }
  }
}
