import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit {
  userName!: string | null;

  constructor(public authService: AuthService) {
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

  logout() {
    this.authService.clear();
  }
}
