import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";

@Component({
  selector: 'app-unsupplier',
  templateUrl: './unsupplier.component.html',
  styleUrls: ['./unsupplier.component.scss']
})
export class UnsupplierComponent implements OnInit {

  supplier!: Supplier;

  constructor(private dialogRef: MatDialogRef<UnsupplierComponent>,
              private supllierService: SupplierService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.supplier = this.data;
  }

  undosupplier() {
    this.supplier.isDeleted = false;
    this.supllierService.undeleteByIdSupplier(this.supplier.id, this.supplier).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Hoàn tác nhà cung cấp thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
