import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sinup-user',
  templateUrl: './sinup-user.component.html',
  styleUrls: ['./sinup-user.component.scss']
})
export class SinupUserComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  login() {
    location.replace("/login");
  }

  otp() {
    location.replace("/otp");
  }
}
