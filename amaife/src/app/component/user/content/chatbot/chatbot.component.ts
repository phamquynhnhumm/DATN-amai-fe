import {Component, OnInit} from '@angular/core';
import {signOut} from "@angular/fire/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {char} from "@zxing/library/es2015/customTypings";
import {ChatboxService} from "../../../../service/chatbox.service";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  constructor(private chatService: ChatboxService) {
  }

  ngOnInit(): void {
  }

  chatbox() {
    console.log(this.formChat.value.msg);
    this.chatService.chatbox(this.formChat.value.msg).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }
  formChat = new FormGroup(
    {
      msg: new FormControl("", Validators.required),
    })
}
