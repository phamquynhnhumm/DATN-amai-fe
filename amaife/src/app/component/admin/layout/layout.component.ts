import {Component, OnInit} from '@angular/core';
import {navItems} from "./navItems";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public navItems = navItems;
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
  }

}
