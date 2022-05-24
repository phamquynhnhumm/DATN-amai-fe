import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {Oder} from "../../../../model/order/Oder";
import {EStatusOrder} from "../../../../model/order/EStatusOrder";

@Component({
  selector: 'app-orderuser',
  templateUrl: './orderuser.component.html',
  styleUrls: ['./orderuser.component.scss']
})
export class OrderuserComponent implements OnInit {
  userName!: string | null;
  orderList !: Array<Oder>;
  p: number | any;
  eStatusOrder = EStatusOrder;

  constructor(public authService: AuthService,
              private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.userName = this.authService.getUsername();
    // @ts-ignore
    this.orderService.findOderUser("thanhthuy").subscribe(
      dataorder => {
        this.p = 1;
        this.orderList = dataorder;
      }
    );
  }
}
