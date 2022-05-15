import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodService} from "../../../../../service/food.service";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";
import {Material} from "../../../../../model/food/Material";

@Component({
  selector: 'app-editmaterial',
  templateUrl: './editmaterial.component.html',
  styleUrls: ['./editmaterial.component.scss']
})
export class EditmaterialComponent implements OnInit {

  material!: Material;
  suppliers !: Array<Supplier>;
  formMaterial!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditmaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private materialService: FoodService,
    private supplierService: SupplierService
    ) {
  }

  ngOnInit(): void {

    this.supplierService.findAllSupplierIsdelete(false).subscribe(
      data => {
        this.suppliers = data;
      }
    )
    this.material = this.data;

    this.formMaterial = new FormGroup(
      {
        name: new FormControl(this.data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        unit: new FormControl(this.data.unit, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
        price: new FormControl(this.data.price, [Validators.required, Validators.min(0)]),
        quantity: new FormControl(this.data.quantity, [Validators.required, Validators.min(0)]),
        importKg: new FormControl(this.data.importKg, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        supplierList: new FormControl(this.data.supplierList, Validators.required),
        remainingKg: new FormControl(this.data.remainingKg),
      })
  }

  bolen: boolean = false;

  cencal() {
    this.bolen = true;
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật nguyên liệu", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    /**
     * Trách trường hợp isDelete null
     */
    if (this.formMaterial.value.isDeleted) {
      this.formMaterial.value.isDeleted = true;
    } else {
      this.formMaterial.value.isDeleted = false;
    }
    if (this.formMaterial.valid) {
      this.material.name = this.formMaterial.value.name;
      this.material.unit = this.formMaterial.value.unit;
      this.material.price = this.formMaterial.value.price;
      this.material.importKg = this.formMaterial.value.importKg;
      this.material.quantity = this.formMaterial.value.quantity;
      this.material.supplierList = this.formMaterial.value.supplierList;
      this.material.remainingKg = this.formMaterial.value.importKg;

      if (!this.bolen) {
        this.material.isDeleted = this.formMaterial.value.isDeleted;
        this.materialService.updateMaterial(this.material).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật nguyên liệu thành công", "OK", {
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
