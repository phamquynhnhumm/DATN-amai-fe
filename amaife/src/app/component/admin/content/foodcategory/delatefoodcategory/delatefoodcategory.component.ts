import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delatefoodcategory',
  templateUrl: './delatefoodcategory.component.html',
  styleUrls: ['./delatefoodcategory.component.scss']
})
export class DelatefoodcategoryComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DelatefoodcategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
  }

}
