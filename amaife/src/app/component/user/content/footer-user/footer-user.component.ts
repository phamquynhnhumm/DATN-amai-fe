import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../../service/shop.service";
import {Shop} from "../../../../model/shop/Shop";

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.scss']
})
export class FooterUserComponent implements OnInit {

  shop !: Array<Shop>;

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.shopService.findAllShopCustomer().subscribe(
      data => {
        this.shop = data;
        console.log(this.shop)
      }
    )
  }
}
