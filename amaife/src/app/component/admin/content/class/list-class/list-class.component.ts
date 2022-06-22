import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../../../../service/registration.service";
import {AuthService} from "../../../../../service/auth.service";
import {Registration} from "../../../../../model/class/Registration";
import {DeleteClassComponent} from "../delete-class/delete-class.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatOptionSelectionChange} from "@angular/material/core";
import {FormBuilder, Validators} from "@angular/forms";
import {EStatuasHandle} from "../../../../../model/class/EStatuasHandle";
import {UpdateClassComponent} from "../update-class/update-class.component";
import {DetailClassComponent} from "../detail-class/detail-class.component";

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.scss']
})
export class ListClassComponent implements OnInit {
  registrationList!: Array<Registration>;
  p !: number;
  eStatuasHandle = EStatuasHandle;
  searchSubject = ['Tên khách', 'Số điện thoại'];
  searchss: string = "Chọn thuộc tính";

  constructor(private registrationService: RegistrationService,
              public auth: AuthService,
              private matSnackBar: MatSnackBar,
              private dialog: MatDialog,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.registrationService.findALlBYIsDelete(false).subscribe(
      data => {
        this.p = 1;
        this.registrationList = data;
      }
    )
  }

  onCheckboxChangeRegistration($event: MatOptionSelectionChange<string>, searchs: string) {
    this.searchss = searchs;
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  openDeleteRegistration(registration: Registration) {
    this.registrationService.finByID(registration.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DeleteClassComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openEditregistration(registration: Registration) {
    this.registrationService.finByID(registration.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UpdateClassComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }
  detailregistrations(registrations: Registration) {
    this.registrationService.finByID(registrations.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailClassComponent, {
          width: '500px',
          height: '380px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  openDeleteregistration(registration: Registration) {
    this.registrationService.finByID(registration.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DeleteClassComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  searchRegistration(search: string) {
    if (this.searchss == this.searchSubject[0]) {
      this.registrationService.searchRegistration(false, search, "").subscribe(
        (data) => {
          this.registrationList = data;
        },
        (error) => {
          this.registrationService.findALlBYIsDelete(false).subscribe(
            data => {
              this.p = 1;
              this.registrationList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
    if (this.searchss == this.searchSubject[1]) {
      console.log("tìm danh mục ")
      this.registrationService.searchRegistration(false, "", search).subscribe(
        (data) => {
          this.registrationList = data;
        },
        (error) => {
          this.registrationService.findALlBYIsDelete(false).subscribe(
            data => {
              this.p = 1;
              this.registrationList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
  }
}
