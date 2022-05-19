import {Component, OnInit} from '@angular/core';
import {EGender} from "../../../../../model/user/EGender";
import {AuthService} from "../../../../../service/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  eGender = ['MALE', 'FEMALE', 'OTHER']


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
