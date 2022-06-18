import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatboxService} from "../../../../service/chatbox.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../service/auth.service";
import {Chat} from "../../../../model/chat/Chat";
import {UserService} from "../../../../service/user.service";
import {Users} from "../../../../model/user/Users";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  chatList !: Array<Chat>
  chat !: Chat
  user!: Users;
  chatFs: boolean = false;

  constructor(private chatService: ChatboxService,
              private snackBar: MatSnackBar,
              public auth: AuthService,
              public userService: UserService,
              private router: Router,
              private matSnackBar: MatSnackBar
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
          this.ngOnInit();
          this.chat = data;
        }, error => {
          this.snackBar.open("Chúng tôi đang cố gắng liên hệ sớm nhất có thể. Cảm ơn bạn!", "OK", {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      )
    }
  }

  Chat() {
    this.chatFs = true;
  }

  NoChat() {
    this.chatFs = false;
  }

  delete(id: number) {
    this.chatService.deleteByIdChat(id).subscribe(
      data => {
        this.ngOnInit();
      }, error => {
        this.matSnackBar.open("Xóa tin nhắn thất bại!")._dismissAfter(3000)
      }
    )
  }

  recall(id: number) {
    this.chatService.findbyid(id).subscribe(
      data => {
        this.chatService.updateChat(data).subscribe(
          data => {
            this.ngOnInit();
          }, error => {
            this.matSnackBar.open("Hủy tin nhắn thất bại!")._dismissAfter(3000)
          }
        )
      }
    )
  }
}
