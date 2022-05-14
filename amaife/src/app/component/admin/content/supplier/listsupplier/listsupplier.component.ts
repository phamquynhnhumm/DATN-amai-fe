import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatOptionSelectionChange} from "@angular/material/core";
import {DetailsupplierComponent} from "../detailsupplier/detailsupplier.component";
import {DeletesupplierComponent} from "../deletesupplier/deletesupplier.component";
import {EditsupplierComponent} from "../editsupplier/editsupplier.component";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";

@Component({
  selector: 'app-listsupplier',
  templateUrl: './listsupplier.component.html',
  styleUrls: ['./listsupplier.component.scss']
})
export class ListsupplierComponent implements OnInit {

  supplierList!: Array<Supplier>;
  p: number | any;
  searchSubject = ['Tên', 'Email', 'Số điện thoại', 'Địa chỉ'];
  searchss: string = "Chọn thuộc tính";

  constructor(
    private supplierService: SupplierService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.supplierService.findAllSupplierIsdelete(false).subscribe(
      data => {
        this.p = 1;
        this.supplierList = data;
        console.log(this.supplierList);
      }
    )
  }

  onCheckboxChangeSupplier($event: MatOptionSelectionChange<string>, searchs: string) {
    this.searchss = searchs;
    console.log(this.searchss)
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  openEditSupplier(supplier: Supplier) {
    this.supplierService.findByIdSupplier(supplier.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(EditsupplierComponent, {
          width: '500px',
          height: '580px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDeleteSupplier(supplier: Supplier) {
    this.supplierService.findByIdSupplier(supplier.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DeletesupplierComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDetailSupplier(supplier: Supplier) {
    this.supplierService.findByIdSupplier(supplier.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailsupplierComponent, {
          width: '550px',
          height: '580px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  searchSupplier(search: string) {
    if (this.searchss == this.searchSubject[0]) {
      this.supplierService.searchSupplier(false, search, "", "", "").subscribe(
        (data) => {
          console.log(data)
          this.supplierList = data;
        },
        (error) => {
          this.supplierService.findAllSupplierIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.supplierList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[2]) {
      console.log(this.searchss)
      console.log("tìm kiếm theo số điênh thoại")
      this.supplierService.searchSupplier(false, "", "", search, "").subscribe(
        (data) => {
          console.log(data)
          this.supplierList = data;
        },
        (error) => {
          this.supplierService.findAllSupplierIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.supplierList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[1]) {
      console.log(this.searchss)
      console.log("tìm kiếm theo Emaill")
      this.supplierService.searchSupplier(false, "", search, "", "").subscribe(
        (data) => {
          console.log(data)
          this.supplierList = data;
        },
        (error) => {
          this.supplierService.findAllSupplierIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.supplierList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[3]) {
      console.log(this.searchss)
      console.log("tìm kiếm theo địa chỉ")
      this.supplierService.searchSupplier(false, "", "", "", search).subscribe(
        (data) => {
          console.log(data)
          this.supplierList = data;
          console.log(data);
        },
        (error) => {
          this.supplierService.findAllSupplierIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.supplierList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
  }
}
