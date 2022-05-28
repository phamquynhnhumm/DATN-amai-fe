import {Component} from '@angular/core';
import {navItems} from "./component/admin/layout/navItems";
import {AuthService} from "./service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amaife';
  public navItems = navItems;
  public href: string = "";

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.href = window.location.href;
    console.log(this.href);
  }
}
