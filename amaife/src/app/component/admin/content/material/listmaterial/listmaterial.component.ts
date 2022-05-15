import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatOptionSelectionChange} from "@angular/material/core";
import {Material} from "../../../../../model/food/Material";
import {EditmaterialComponent} from "../editmaterial/editmaterial.component";
import {DeletematerialComponent} from "../deletematerial/deletematerial.component";
import {DetailmaterialComponent} from "../detailmaterial/detailmaterial.component";
import {DetailsupplierComponent} from "../../supplier/detailsupplier/detailsupplier.component";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";

@Component({
  selector: 'app-listmaterial',
  templateUrl: './listmaterial.component.html',
  styleUrls: ['./listmaterial.component.scss']
})
export class ListmaterialComponent implements OnInit {

  materialList!: Array<Material>;
  p: number | any;
  searchSubject = ['Tên nguyên liệu', 'Nhà cung cấp', 'Đơn vị tính'];
  searchss: string = "Chọn thuộc tính";

  constructor(
    private materialService: FoodService,
    private supplierService: SupplierService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  dtOptions: DataTables.Settings = {};
  material!: Material;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.materialService.findAllMaterialIsdelete(false).subscribe(
      data => {
        this.p = 1;
        this.materialList = data;
        console.log(data)
      }
    )
  }

  onCheckboxChangeMaterial($event: MatOptionSelectionChange<string>, searchs: string) {
    this.searchss = searchs;
    console.log(this.searchss)
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  openEditMaterial(material: Material) {
    this.materialService.findByIdMaterial(material.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(EditmaterialComponent, {
          width: '800px',
          height: '550px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDeleteMaterial(material: Material) {
    this.materialService.findByIdMaterial(material.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DeletematerialComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDetailMaterial(material: Material) {
    this.materialService.findByIdMaterial(material.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailmaterialComponent, {
          width: '800px',
          height: '450px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  searchMaterial(search: string) {
    if (this.searchss == this.searchSubject[0]) {
      this.materialService.searcMaterial(false, search, "", "").subscribe(
        (data) => {
          this.materialList = data;
        },
        (error) => {
          this.materialService.findAllMaterialIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.materialList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[1]) {
      console.log("tìm danh mục ")
      this.materialService.searcMaterial(false, "", "", search).subscribe(
        (data) => {
          this.materialList = data;
        },
        (error) => {
          this.materialService.findAllMaterialIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.materialList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[2]) {
      console.log("tìm kiếm theo đơn vị tính")
      this.materialService.searcMaterial(false, "", search, "").subscribe(
        (data) => {
          this.materialList = data;
        },
        (error) => {
          this.materialService.findAllMaterialIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.materialList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
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
