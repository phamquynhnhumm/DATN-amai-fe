import {Component, OnInit} from '@angular/core';
import {Material} from "../../../../../model/food/Material";
import {SupplierService} from "../../../../../service/supplier.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatOptionSelectionChange} from "@angular/material/core";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {DetailsupplierComponent} from "../../supplier/detailsupplier/detailsupplier.component";
import {Oder} from "../../../../../model/order/Oder";
import {OrderService} from "../../../../../service/order.service";
import {DeleteorderComponent} from "../deleteorder/deleteorder.component";
import {UpdateorderComponent} from "../updateorder/updateorder.component";
import {DetailorderComponent} from "../detailorder/detailorder.component";
import {EStatusOrder} from "../../../../../model/order/EStatusOrder";

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.scss']
})
export class ListorderComponent implements OnInit {

  orderList!: Array<Oder>;
  eStatusOrder = EStatusOrder;
  p: number | any;
  searchSubject = ['Tên người nhận', 'Tên tài khoản', 'Địa chỉ đặt', 'Số điện thoại'];
  searchss: string = "Chọn thuộc tính";

  constructor(
    private orderService: OrderService,
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
    this.orderService.findAllOrderlIsdelete(false).subscribe(
      data => {
        this.p = 1;
        this.orderList = data;
        console.log(data)
      }
    )
  }

  onCheckboxChangeOder($event: MatOptionSelectionChange<string>, searchs: string) {
    this.searchss = searchs;
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  openEditOder(oder: Oder) {
    this.orderService.findByIdOder(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UpdateorderComponent, {
          width: '450px',
          height: '350px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDeleteOder(oder: Oder) {
    this.orderService.findByIdOder(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DeleteorderComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDetailOrder(oder: Oder) {
    this.orderService.findByIdOder(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailorderComponent, {
          width: '800px',
          height: '580px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  searchOder(search: string) {
    if (this.searchss == this.searchSubject[0]) {
      this.orderService.searcOder(false, false, search, "", "", "").subscribe(
        (data) => {
          this.orderList = data;
        },
        (error) => {
          this.orderService.findAllOrderlIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.orderList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[1]) {
      this.orderService.searcOder(false, false, "", search, "", "").subscribe(
        (data) => {
          this.orderList = data;
        },
        (error) => {
          this.orderService.findAllOrderlIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.orderList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[2]) {
      this.orderService.searcOder(false, false, "", "", search, "").subscribe(
        (data) => {
          this.orderList = data;
        },
        (error) => {
          this.orderService.findAllOrderlIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.orderList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[3]) {
      this.orderService.searcOder(false, false, "", "", "", search).subscribe(
        (data) => {
          this.orderList = data;
        },
        (error) => {
          this.orderService.findAllOrderlIsdelete(false).subscribe(
            data => {
              this.p = 1;
              this.orderList = data;
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
