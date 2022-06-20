import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Material} from "../../../../../model/food/Material";

@Component({
  selector: 'app-deletematerial',
  templateUrl: './deletematerial.component.html',
  styleUrls: ['./deletematerial.component.scss']
})
export class DeletematerialComponent implements OnInit {

  material!: Material;

  constructor(private dialogRef: MatDialogRef<DeletematerialComponent>,
              private materialService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.material = this.data;
  }

  deleteMaterial() {
    this.materialService.deleteByIdMaterial(this.material.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xóa nguyên liệu thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
