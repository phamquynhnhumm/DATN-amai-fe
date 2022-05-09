import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listfoodcategory',
  templateUrl: './listfoodcategory.component.html',
  styleUrls: ['./listfoodcategory.component.scss']
})
export class ListfoodcategoryComponent implements OnInit {

  constructor() { }
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
}
