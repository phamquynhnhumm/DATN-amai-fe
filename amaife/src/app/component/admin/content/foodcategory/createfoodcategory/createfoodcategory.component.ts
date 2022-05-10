import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createfoodcategory',
  templateUrl: './createfoodcategory.component.html',
  styleUrls: ['./createfoodcategory.component.scss']
})
export class CreatefoodcategoryComponent implements OnInit {
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  constructor() { }

  ngOnInit(): void {
  }

}
