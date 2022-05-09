import { Component } from '@angular/core';
import {navItems} from "./component/admin/layout/navItems";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amaife';
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
}
