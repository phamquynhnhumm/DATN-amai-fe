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
import {OrderService} from "../../../../../service/order.service";
import {Oder} from "../../../../../model/order/Oder";
import {DetailorderComponent} from "../../order/detailorder/detailorder.component";
import {UnoderComponent} from "../unoder/unoder.component";
import {UserService} from "../../../../../service/user.service";
import {Users} from "../../../../../model/user/Users";
import {DetailcustomerComponent} from "../../customer/detailcustomer/detailcustomer.component";
import {UnUsercustomerComponent} from "../un-usercustomer/un-usercustomer.component";

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
  oderList!: Array<Oder>;
  userList!: Array<Users>;
  p: number | any;
  pfood: number | any;
  icons = {cilSettings, cilLoopCircular};


  constructor(
    private foodandcategoryService: FoodService,
    private supplierService: SupplierService,
    private oderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private usserService: UserService,
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
    //Danh s??ch danh m???c ???? b??? x??a
    this.foodandcategoryService.findAllFoodCategoryIsdelete(true).subscribe(
      data => {
        this.p = 1;
        this.foodCategoryList = data;
      }
    );

    //Danh s??ch  m??n ???? b??? x??a
    this.foodandcategoryService.findAllFoodIsdelete(true).subscribe(
      datafood => {
        this.pfood = 1;
        this.foodList = datafood;
      }
    );

    //Danh s??ch nh?? cung c???p ???? b??? x??a
    this.supplierService.findAllSupplierIsdelete(true).subscribe(
      datasupplier => {
        this.pfood = 1;
        this.supplierList = datasupplier;
      }
    );

    //Danh s??ch nguy??n li???u ???? b??? x??a
    this.foodandcategoryService.findAllMaterialIsdelete(true).subscribe(
      datamaterial => {
        this.pfood = 1;
        this.materialList = datamaterial;
      }
    );
    //danh s??ch ????n h??ng ???? b??? x??a
    this.oderService.findAllOrderlIsdelete(true).subscribe(
      dataoder => {
        this.pfood = 1;
        this.oderList = dataoder;
      }
    );
    //T??i kho???n kh??ch h??ng ???? b??? kh??o
    this.usserService.findAllByAccount_Role("ROLE_CUSTOMER", true).subscribe(
      dataUser => {
        this.pfood = 1;
        this.userList = dataUser;
        console.log(this.userList)
      }
    )
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
        this.matSnackBar.open("Hi???n kh??ng c?? k???t qu??? n??o ph?? h???p v???i th??ng tin c???n t??m!")._dismissAfter(3000)
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
        this.matSnackBar.open("Hi???n kh??ng c?? k???t qu??? n??o ph?? h???p v???i th??ng tin c???n t??m!")._dismissAfter(3000)
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
        this.matSnackBar.open("Hi???n kh??ng c?? k???t qu??? n??o ph?? h???p v???i th??ng tin c???n t??m!")._dismissAfter(3000)
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
        this.matSnackBar.open("Hi???n kh??ng c?? k???t qu??? n??o ph?? h???p v???i th??ng tin c???n t??m!")._dismissAfter(3000)
      }
    );
  }

  openDetailOder(oder: Oder) {
    this.oderService.findByIdOder(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailorderComponent, {
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

  openUnDeleteOder(oder: Oder) {
    this.oderService.findByIdOder(oder.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UnoderComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }

  searchOder(value: string) {

  }

  openDetailUser(user: Users) {
    this.usserService.findByIdUser(user.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(DetailcustomerComponent, {
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

  openUnDeleteUser(user: Users) {
    this.usserService.findByIdUser(user.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(UnUsercustomerComponent, {
          width: '450px',
          height: '300px',
          data: data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      })
  }
}
