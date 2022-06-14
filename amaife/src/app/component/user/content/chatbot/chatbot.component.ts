import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatboxService} from "../../../../service/chatbox.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../service/auth.service";
import {Chat} from "../../../../model/chat/Chat";
import {UserService} from "../../../../service/user.service";
import {Users} from "../../../../model/user/Users";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  chatList !: Array<Chat>
  chat !: Chat
  user!: Users;

  constructor(private chatService: ChatboxService,
              private snackBar: MatSnackBar,
              public auth: AuthService,
              public userService: UserService,
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.chatService.findUserName(this.auth.getUsername()).subscribe(
      (data) => {
        this.chatList = data
      }
    )
    // @ts-ignore
    this.userService.findByIdUser(this.auth.getIdUser()).subscribe(
      dataUser => {
        this.user = dataUser;
      }
    )
  }

  formChat = new FormGroup(
    {
      msg: new FormControl("", Validators.required),
      msgchatbot: new FormControl("ChatBot"),
    })

  chatbox() {
    if (this.formChat.valid) {
      this.chatService.chatbot(this.formChat.value).subscribe(
        (data) => {
          this.chat = data;
          window.location.reload()
        }, error => {
          this.snackBar.open("Chúng tôi đang cố gắng liên hệ sớm nhất có thể. Cảm ơn bạn!", "OK", {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      )
    } else {
      this.snackBar.open("Vui lòng nhập nội dung tin nhắn!", "OK", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }
  }
}
