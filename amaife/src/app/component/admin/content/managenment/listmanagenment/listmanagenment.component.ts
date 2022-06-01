import {Component, OnInit} from '@angular/core';
import {Users} from "../../../../../model/user/Users";
import {UserService} from "../../../../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Food} from "../../../../../model/food/Food";
import {MatOptionSelectionChange} from "@angular/material/core";
import {DetailcustomerComponent} from "../../customer/detailcustomer/detailcustomer.component";
import {LidetailmanagenmentComponent} from "../lidetailmanagenment/lidetailmanagenment.component";

@Component({
  selector: 'app-listmanagenment',
  templateUrl: './listmanagenment.component.html',
  styleUrls: ['./listmanagenment.component.scss']
})
export class ListmanagenmentComponent implements OnInit {

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
    this.userService.findAllByAccount_Role("ROLE_MANAGEMENT", false).subscribe(
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
        const dialogRef = this.dialog.open(LidetailmanagenmentComponent, {
          width: '850px',
          height: '400px',
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
          this.userService.findAllByAccount_Role("ROLE_MANAGEMENT", false).subscribe(
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
          this.userService.findAllByAccount_Role("ROLE_MANAGEMENT", false).subscribe(
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
          this.userService.findAllByAccount_Role("ROLE_MANAGEMENT", false).subscribe(
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
          this.userService.findAllByAccount_Role("ROLE_MANAGEMENT", false).subscribe(
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
          this.userService.findAllByAccount_Role("ROLE_MANAGEMENT", false).subscribe(
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
}
