import {Component, OnInit} from '@angular/core';
import {BarcodeFormat} from "@zxing/library";
import {Router} from "@angular/router";

@Component({
  selector: 'app-opencamera',
  templateUrl: './opencamera.component.html',
  styleUrls: ['./opencamera.component.scss']
})
export class OpencameraComponent implements OnInit {

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }

  allowedFormats = [BarcodeFormat.QR_CODE];

  scanQR($event: string) {
    this.route.navigateByUrl("/DATN-amai-fe/amaife/orderqrcode/" + $event)
  }
}
