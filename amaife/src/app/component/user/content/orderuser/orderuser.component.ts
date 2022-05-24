import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../service/auth.service";

@Component({
  selector: 'app-orderuser',
  templateUrl: './orderuser.component.html',
  styleUrls: ['./orderuser.component.scss']
})
export class OrderuserComponent implements OnInit {

  constructor(public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

}
