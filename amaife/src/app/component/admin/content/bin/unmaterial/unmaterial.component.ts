import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Material} from "../../../../../model/food/Material";
import {FoodService} from "../../../../../service/food.service";

@Component({
  selector: 'app-unmaterial',
  templateUrl: './unmaterial.component.html',
  styleUrls: ['./unmaterial.component.scss']
})
export class UnmaterialComponent implements OnInit {

  material!: Material;

  constructor(private dialogRef: MatDialogRef<UnmaterialComponent>,
              private materialService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.material = this.data;
  }

  undomaterial() {
    this.material.isDeleted = false;
    this.materialService.undeleteByIdMaterial(this.material.id, this.material).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Hoàn tác nguyên liệu thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
