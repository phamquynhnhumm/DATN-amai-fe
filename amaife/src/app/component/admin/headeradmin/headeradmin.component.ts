import {Component, Input} from '@angular/core';
import {HeaderComponent} from "@coreui/angular";
import {cilBell, cilEnvelopeOpen, cilMenu, cilSettings, cilUser} from '@coreui/icons';
import {AuthService} from "../../../service/auth.service";
import {OrderService} from "../../../service/order.service";
import {Oder} from "../../../model/order/Oder";
import {EStatusOrder} from "../../../model/order/EStatusOrder";
import {DetailorderComponent} from "../content/order/detailorder/detailorder.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmOderComponent} from "../content/order/confirm-oder/confirm-oder.component";
import {Registration} from "../../../model/class/Registration";
import {RegistrationService} from "../../../service/registration.service";
import {EStatuasHandle} from "../../../model/class/EStatuasHandle";
import {Router} from "@angular/router";
import {ConfirmClassComponent} from "../content/class/confirm-class/confirm-class.component";
import {DetailClassComponent} from "../content/class/detail-class/detail-class.component";

@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.scss']
})
export class HeaderadminComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar";
  icons = {cilSettings, cilMenu, cilUser, cilEnvelopeOpen, cilBell,};

  public newMessages = new Array(4)
  userName!: string | null;
  oderList!: Array<Oder>;
  registration!: Array<Registration>;

  constructor(
    public authService: AuthService,
    private registrationService: RegistrationService,
    private oderService: OrderService,
    private dialog: MatDialog,
    private route: Router
  ) {
    super();
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null) {
      this.authService.assignSessionStorageWithLocalStorage();
      this.userName = this.authService.getUsername();
    }
    this.oderService.finAllStatus(EStatusOrder.UNCONFIRMED).subscribe(
      data => {
        this.oderList = data;
      }
    )
    this.registrationService.finAllStatus(EStatuasHandle.NOTCONTACTED).subscribe(
      data => {
        this.registration = data;
      }
    )
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.clear();
    location.replace("/login");
  }

  confirm(order: Oder) {
    this.oderService.findByIdOder(order.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(ConfirmOderComponent, {
          width: '400px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  detail(order: Oder) {
    this.oderService.findByIdOder(order.id).subscribe(
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

  confirmregistrations(registrations: Registration) {
    this.registrationService.finByID(registrations.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(ConfirmClassComponent, {
          width: '500px',
          height: '350px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  login() {
    location.replace("/login");
  }

  opencamera() {
    location.replace("/opencamera");
  }
}
