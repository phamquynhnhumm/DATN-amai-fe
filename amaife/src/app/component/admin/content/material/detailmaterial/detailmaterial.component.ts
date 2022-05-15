import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DetailfoodComponent} from "../../food/detailfood/detailfood.component";
import {Material} from "../../../../../model/food/Material";
import {FoodDetail} from "../../../../../model/food/FoodDetail";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";
import {DetailsupplierComponent} from "../../supplier/detailsupplier/detailsupplier.component";

@Component({
  selector: 'app-detailmaterial',
  templateUrl: './detailmaterial.component.html',
  styleUrls: ['./detailmaterial.component.scss']
})
export class DetailmaterialComponent implements OnInit {

  material!: Material;
  fooddetails!: Array<FoodDetail> | any;
  foodnull!: boolean;

  constructor(private dialogRef: MatDialogRef<DetailmaterialComponent>,
              private mterialService: FoodService,
              private supplierService: SupplierService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.material = this.data;
    // this.mterialService.findAllFoodByFoodCategory_Id(this.material.id).subscribe(
    //   datas => {
    //     this.fooddetails = datas;
    //   },
    //   error => {
    //     this.foodnull = false;
    //   }
    // )
  }

  deleteMaterial() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi tiết nguyên liệu thành công", "OK", {
      duration: 4000
    })
  }

  openDetailMaterial(material: Material) {
    this.mterialService.findByIdMaterial(material.id).subscribe(
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

  openDetailSuppkier(supplierList: Supplier) {
    this.supplierService.findByIdSupplier(supplierList.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailsupplierComponent, {
          width: '450px',
          height: '580px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }
}
