import {Component, Input} from '@angular/core';
import {HeaderComponent} from "@coreui/angular";
import {cilUser, cilSettings, cilMenu, cilEnvelopeOpen, cilBell} from '@coreui/icons';
import {AuthService} from "../../../service/auth.service";

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

  constructor(
    public authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null) {
      this.authService.assignSessionStorageWithLocalStorage();
      this.userName = this.authService.getUsername();
    }
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.clear();
  }
}
