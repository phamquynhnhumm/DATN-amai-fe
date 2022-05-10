import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-detailfoodcategory',
  templateUrl: './detailfoodcategory.component.html',
  styleUrls: ['./detailfoodcategory.component.scss']
})
export class DetailfoodcategoryComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DetailfoodcategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }


  ngOnInit(): void {
  }

}
