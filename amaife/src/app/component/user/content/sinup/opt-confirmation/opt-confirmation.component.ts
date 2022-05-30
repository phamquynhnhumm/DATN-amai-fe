import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-opt-confirmation',
  templateUrl: './opt-confirmation.component.html',
  styleUrls: ['./opt-confirmation.component.scss']
})
export class OptConfirmationComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  sinup() {
    location.replace("/sinup")
  }
}
