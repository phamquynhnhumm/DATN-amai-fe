import {Component, OnInit} from '@angular/core';
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FoodService} from "../../../../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DetailfoodcategoryComponent} from "../../foodcategory/detailfoodcategory/detailfoodcategory.component";
import {UndofoodandcategoryComponent} from "../undofoodandcategory/undofoodandcategory.component";
import {Food} from "../../../../../model/food/Food";
import {cilLoopCircular, cilSettings} from "@coreui/icons";
import {UndofoodComponent} from "../undofood/undofood.component";
import {DetailfoodComponent} from "../../food/detailfood/detailfood.component";
import {SupplierService} from "../../../../../service/supplier.service";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {UnsupplierComponent} from "../unsupplier/unsupplier.component";
import {DetailsupplierComponent} from "../../supplier/detailsupplier/detailsupplier.component";
import {Material} from "../../../../../model/food/Material";
import {DetailmaterialComponent} from "../../material/detailmaterial/detailmaterial.component";
import {UnmaterialComponent} from "../unmaterial/unmaterial.component";

@Component({
  selector: 'app-deletefoodandcategory',
  templateUrl: './deletefoodandcategory.component.html',
  styleUrls: ['./deletefoodandcategory.component.scss']
})
export class DeletefoodandcategoryComponent implements OnInit {
  namedDelete !: string;
  foodCategoryList!: Array<FoodCategory>;
  foodList!: Array<Food>;
  supplierList!: Array<Supplier>;
  materialList!: Array<Material>;
  p: number | any;
  pfood: number | any;
  icons = {cilSettings, cilLoopCircular};


  constructor(
    private foodandcategoryService: FoodService,
    private supplierService: SupplierService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  dtOptions: DataTables.Settings = {};
  foodcategory!: FoodCategory;

  ngOnInit(): void {
    this.namedDelete = "foodcategory";
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    //Danh sách danh mục đã bị xóa
    this.foodandcategoryService.findAllFoodCategoryIsdelete(true).subscribe(
      data => {
        this.p = 1;
        this.foodCategoryList = data;
      }
    );

    //Danh sách  món đã bị xóa
    this.foodandcategoryService.findAllFoodIsdelete(true).subscribe(
      datafood => {
        this.pfood = 1;
        this.foodList = datafood;
      }
    );

    //Danh sách nhà cung cấp đã bị xóa
    this.supplierService.findAllSupplierIsdelete(true).subscribe(
      datasupplier => {
        this.pfood = 1;
        this.supplierList = datasupplier;
      }
    );

    //Danh sách nguyên liệu đã bị xóa
    this.foodandcategoryService.findAllMaterialIsdelete(true).subscribe(
      datamaterial => {
        this.pfood = 1;
        this.materialList = datamaterial;
      }
    );
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  openUnDeleteFoodCategory(foodcategory: FoodCategory) {
    this.foodandcategoryService.findByIdFoodCategory(foodcategory.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UndofoodandcategoryComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openUnDeleteFood(food: Food) {
    this.foodandcategoryService.findByIdFood(food.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UndofoodComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }


  searchunFoodCategory(search: string) {
    this.foodandcategoryService.searchNameandisDeleteFoodCategory(true, search).subscribe(
      (data) => {
        this.foodCategoryList = data;
      },
      (error) => {
        this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
      }
    );
  }

  openDetailFoodCategory(foodcategory: FoodCategory) {
    this.foodandcategoryService.findByIdFoodCategory(foodcategory.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailfoodcategoryComponent, {
          width: '400px',
          height: '450px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  nameDeleteFoodCategory() {
    this.namedDelete = "foodcategory";
  }

  nameDeleteMaterial() {
    this.namedDelete = "material";
  }

  nameDeleteFood() {
    this.namedDelete = "food";

  }

  nameDeleteCustomer() {
    this.namedDelete = "customer";

  }

  nameDeleteSupplier() {
    this.namedDelete = "supplier";

  }

  nameDeleteOrder() {
    this.namedDelete = "order";

  }

  openDetailFood(food: Food) {

    this.foodandcategoryService.findByIdFood(food.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailfoodComponent, {
          width: '800px',
          height: '650px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  searchFood(value: string) {
    this.foodandcategoryService.searcFood(true, value, "", "").subscribe(
      (data) => {
        this.foodList = data;
      },
      (error) => {
        this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
      }
    );
  }

  openDetailSupplier(supplier: Supplier) {
    this.supplierService.findByIdSupplier(supplier.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailsupplierComponent, {
          width: '550px',
          height: '580px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  openUnDeleteSupplier(supplier: Supplier) {
    this.supplierService.findByIdSupplier(supplier.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UnsupplierComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }


  searchSupplier(value: string) {
    this.supplierService.searchSupplier(true, value, "", "", "").subscribe(
      (data) => {
        this.supplierList = data;
      },
      (error) => {
        this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
      }
    );
  }

  openUnDeleteMaterial(material: Material) {
    this.foodandcategoryService.findByIdMaterial(material.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UnmaterialComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  openDetailMaterial(material: Material) {
    this.foodandcategoryService.findByIdMaterial(material.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailmaterialComponent, {
          width: '800px',
          height: '450px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  searchMaterial(value: string) {
    this.foodandcategoryService.searcMaterial(true, value, "", "").subscribe(
      (data) => {
        this.materialList = data;
      },
      (error) => {
        this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
      }
    );
  }
}
