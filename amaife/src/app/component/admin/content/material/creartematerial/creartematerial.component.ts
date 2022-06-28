import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FoodService} from "../../../../../service/food.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Material} from "../../../../../model/food/Material";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";

@Component({
  selector: 'app-creartematerial',
  templateUrl: './creartematerial.component.html',
  styleUrls: ['./creartematerial.component.scss']
})
export class CreartematerialComponent implements OnInit {

  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  material!: Material;
  suppliers !: Array<Supplier>;

  constructor(private snackBar: MatSnackBar,
              private route: Router,
              private materialService: FoodService,
              private supplierService: SupplierService) {
  }

  ngOnInit(): void {
    this.supplierService.findAllSupplierIsdelete(false).subscribe(
      data => {
        this.suppliers = data;
      }
    )
  }

  formMaterial = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      price: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(1000000)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      supplierList: new FormControl('', Validators.required),
    }
  )

  onSubmit() {
    console.log(this.formMaterial.value);
    if (this.formMaterial.valid) {
      console.log(this.formMaterial.value)
      this.materialService.createMaterial(this.formMaterial.value).subscribe(
        (data) => {
          this.route.navigateByUrl("/material").then(() => this.snackBar.open("Thêm mới thành công!")._dismissAfter(3000))
        }
      )
    } else {
      this.snackBar.open("Thêm mới thấy bại !")._dismissAfter(3000);
    }
  }
}
