import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";

@Component({
  selector: 'app-detailsupplier',
  templateUrl: './detailsupplier.component.html',
  styleUrls: ['./detailsupplier.component.scss']
})
export class DetailsupplierComponent implements OnInit {

  supplier!: Supplier;

  constructor(private dialogRef: MatDialogRef<DetailsupplierComponent>,
              private supplierService: SupplierService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.supplier = this.data;
  }

  cencalSupplierDetail() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi tiết nhà cung cấp thành công", "OK", {
      duration: 4000
    })
  }
}
