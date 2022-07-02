import {Component, Inject, OnInit} from '@angular/core';
import {Oder} from "../../../../model/order/Oder";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-order-address',
  templateUrl: './update-order-address.component.html',
  styleUrls: ['./update-order-address.component.scss']
})
export class UpdateOrderAddressComponent implements OnInit {
  oder!: Oder;

  constructor(
    private dialogRef: MatDialogRef<UpdateOrderAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private oderService: OrderService) {
  }

  formFoodOder!: FormGroup;

  ngOnInit(): void {
    this.oder = this.data;
    this.formFoodOder = new FormGroup(
      {
        address: new FormControl(this.data.address, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      }
    );
  }

  cencal() {
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật địa chỉ đơn hàng", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    if (this.formFoodOder.valid) {
      console.log(this.formFoodOder.value)
      this.oder.address = this.formFoodOder.value.address;
      this.oderService.updateOderAddress(this.oder).subscribe(data => {
          this.dialogRef.close();
          this.snackBar.open("Cập nhật địa chỉ đơn hàng thành công", "OK", {
            duration: 4000
          })
        }
      )
    } else {
      this.snackBar.open("Cập nhật địa chỉ thấy bại !")._dismissAfter(3000);
    }
  }
}
