import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  conversationList : any[];
  chatsList : any[];
  chatGroups : any[];
  currentIdx : number = -1;

  currentRole : string;

  constructor(private sharedService : SharedService,private messageService : MessageService ) {
    
  }

  ngOnInit()
  {
    this.sharedService.getConversations().subscribe((response : any[]) => {
      this.conversationList = response;
      this.currentRole = sessionStorage.getItem('Role');
      console.log(this.conversationList);
      console.log(this.currentRole);
    }, (error) => {
      console.error(error);
    })



  }


  onShowChat(conversationId : number, currentIdx : number)
  {
    this.currentIdx = currentIdx;
    this.sharedService.getChats(conversationId).subscribe((response : any[]) => {
      this.chatsList = response;
      this.chatGroups = this.groupChatsByDate(this.chatsList);

    }, (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: error.message });
    });
  }

  timeCreated(ticketCreatedAt : Date) : string 
  {
    const date = new Date(ticketCreatedAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  }

  groupChatsByDate(chats) {
    const groups = [];
    let currentGroup = null;
  
    for (const chat of chats) {
      const chatDate = new Date(chat.timeStamp).toLocaleDateString();
  
      if (!currentGroup || currentGroup.date !== chatDate) {
        currentGroup = { date: chatDate, chats: [] };
        groups.push(currentGroup);
      }
  
      currentGroup.chats.push(chat);
    }
  
    return groups;
  }
  
  sendMessage()
  {
    const message = this.conversationList[this.currentIdx].message;
    const conversationId = this.conversationList[this.currentIdx].conversationId;

    this.sharedService.sendMessage(message, conversationId).subscribe((response) => {
      console.log(response);
      this.onShowChat(conversationId, this.currentIdx);
      this.conversationList[this.currentIdx].message = "";
    },(error) => {
      console.error(error);
    });
  }

}
