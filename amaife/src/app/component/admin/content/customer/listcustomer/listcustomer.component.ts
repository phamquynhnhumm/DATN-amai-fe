import {Component, OnInit} from '@angular/core';
import {Food} from "../../../../../model/food/Food";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatOptionSelectionChange} from "@angular/material/core";
import {DetailcustomerComponent} from "../detailcustomer/detailcustomer.component";
import {Users} from "../../../../../model/user/Users";
import {UserService} from "../../../../../service/user.service";
import {DeletemanagenmentComponent} from "../../managenment/deletemanagenment/deletemanagenment.component";
import {DeletecustomerComponent} from "../deletecustomer/deletecustomer.component";
import {EnablecustommerComponent} from "../enablecustommer/enablecustommer.component";

@Component({
  selector: 'app-listcustomer',
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.scss']
})
export class ListcustomerComponent implements OnInit {
  users!: Array<Users>;
  p: number | any;
  searchSubject = ['Tên khách hàng', 'Tài khoản', 'Số điện thoại', 'Email', "Địa chỉ"];
  searchss: string = "Chọn thuộc tính";

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  dtOptions: DataTables.Settings = {};
  food!: Food;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.userService.findAllByAccount_Role("ROLE_CUSTOMER", false).subscribe(
      data => {
        this.p = 1;
        this.users = data;
      }
    )
  }

  onCheckboxChangeCustomer($event: MatOptionSelectionChange<string>, searchs: string) {
    this.searchss = searchs;
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  openDetailCustomer(user: Users) {
    this.userService.findByIdUser(user.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailcustomerComponent, {
          width: '850px',
          height: '580px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  searchUser(search: string) {
    if (this.searchss == this.searchSubject[0]) {
      this.userService.searchUserCustomer(search, "", "", "", "").subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          this.userService.findAllByAccount_Role("ROLE_CUSTOMER", false).subscribe(
            data => {
              this.p = 1;
              this.users = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[1]) {
      this.userService.searchUserCustomer("", search, "", "", "").subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          this.userService.findAllByAccount_Role("ROLE_CUSTOMER", false).subscribe(
            data => {
              this.p = 1;
              this.users = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[2]) {
      this.userService.searchUserCustomer("", "", search, "", "").subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          this.userService.findAllByAccount_Role("ROLE_CUSTOMER", false).subscribe(
            data => {
              this.p = 1;
              this.users = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[3]) {
      this.userService.searchUserCustomer("", "", "", search, "").subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          this.userService.findAllByAccount_Role("ROLE_CUSTOMER", false).subscribe(
            data => {
              this.p = 1;
              this.users = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[4]) {
      this.userService.searchUserCustomer("", "", "", "", search).subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          this.userService.findAllByAccount_Role("ROLE_CUSTOMER", false).subscribe(
            data => {
              this.p = 1;
              this.users = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
  }

  enable(user: Users) {
    this.userService.findByIdUser(user.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(EnablecustommerComponent, {
          width: '550px',
          height: '400px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    );
  }

  deltecustomer(user: Users) {
    this.userService.findByIdUser(user.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DeletecustomerComponent, {
          width: '550px',
          height: '400px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    );
  }
}

