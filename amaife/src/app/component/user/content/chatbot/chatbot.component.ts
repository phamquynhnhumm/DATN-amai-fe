import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatboxService} from "../../../../service/chatbox.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../service/auth.service";
import {Chat} from "../../../../model/chat/Chat";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  rep!: string;
  chatList !: Array<Chat>

  constructor(private chatService: ChatboxService,
              private snackBar: MatSnackBar,
              public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.chatService.findUserName(this.auth.getUsername()).subscribe(
      (data) => {
        this.chatList = data
        console.log(this.chatList)
      },
      error => {
        console.log("chưa có data")
      }
    )
  }

  formChat = new FormGroup(
    {
      msg: new FormControl(""),
    })

  chatbox() {
    if (this.formChat.valid) {
      this.chatService.chatbot(this.formChat.value.msg).subscribe(
        data => {
          this.rep = data;
          console.log("không dta doc luón" + this.rep)
        },
        (errors) => {
          console.log("không được");
        }
      )
    } else {
      this.snackBar.open("Chat  thất bại!", "OK", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }
  }


}
