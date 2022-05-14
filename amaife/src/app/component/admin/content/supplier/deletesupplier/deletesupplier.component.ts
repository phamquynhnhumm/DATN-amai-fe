import {Component, Inject, OnInit} from '@angular/core';
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";

@Component({
  selector: 'app-deletesupplier',
  templateUrl: './deletesupplier.component.html',
  styleUrls: ['./deletesupplier.component.scss']
})
export class DeletesupplierComponent implements OnInit {

  supplier!: Supplier;

  constructor(private dialogRef: MatDialogRef<DeletesupplierComponent>,
              private supplierService: SupplierService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.supplier = this.data;
  }

  deletesupplier() {
    this.supplierService.deleteByIdSupplier(this.supplier.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xoá nhà cung cấp thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
