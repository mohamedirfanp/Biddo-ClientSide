import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

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
  regex = /[a-zA-Z0-9]+/; 

  currentRole : string;
  private interval: number = 15000; // 15 seconds
  private timerSubscription: any;

  constructor(private sharedService : SharedService,private messageService : MessageService ) {
    
  }

  ngOnInit()
  {
    this.getConversations();
    
  }
  

  getConversations()
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

  onShowChatWrapper(conversationId : number, currentIdx : number) 
  {
    this.clear();
    this.chatGroups = [];
    this.onShowChat(conversationId, currentIdx);
    this.timerSubscription = setInterval(() => {
      this.onShowChat(conversationId,currentIdx);
    }, this.interval);
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
    const minutes = date.getMinutes().toString().padStart(2, '0');
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
    if (this.regex.test(message)) {
      console.log("Message contains alphabets or numbers.");
    } else {
      console.log("Message does not contain alphabets or numbers.");
    }

    const conversationId = this.conversationList[this.currentIdx].conversationId;

    this.sharedService.sendMessage(message, conversationId).subscribe((response) => {
      console.log(response);
      this.onShowChat(conversationId, this.currentIdx);
      this.conversationList[this.currentIdx].message = "";
    },(error) => {
      console.error(error);
    });
  }
  getColor(name) {
    let hash = 0;
    //give only 100 dark colors
    let colors = ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF", "#FFCCFF", "#FF99CC", "#FF6666", "#FF0000", "#FF9900", "#FFFF00", "#CCFF00", "#66FF66", "#00FF00", "#00FF99", "#00FFFF", "#33CCFF", "#3399FF", "#6666FF", "#CC66FF", "#CC33FF", "#FF33FF", "#FF00FF", "#CC00CC", "#FF6699", "#FF0066", "#FF0033", "#FF3300", "#FF6600", "#FFCC00", "#CCFF33", "#66FF33", "#00FF66", "#00FFCC", "#00CCFF", "#3366FF", "#6633FF", "#9933FF", "#CC00FF", "#FF00CC", "#FF0099", "#CC0066", "#FF3333", "#FF6633", "#FFCC33", "#CCFF66", "#66FF66", "#33FF99", "#66FFFF", "#33CCFF", "#6666CC", "#9933CC", "#FF33FF", "#CC66FF", "#FF99FF", "#FF66CC", "#FF3399", "#CC0033", "#FF0000", "#FF6600", "#FFCC00", "#FFFF00", "#CCFF00", "#66FF00", "#00FF00", "#00FF66", "#00FFFF", "#0066FF", "#0000FF", "#6600FF", "#CC00FF", "#FF00FF", "#FF00CC", "#FF0066", "#FF0000", "#FF3300", "#FF9900", "#FFFF00", "#CCFF66", "#66FF66", "#00FF66", "#00FFCC", "#00FFFF", "#0066FF", "#6666FF", "#CC66FF", "#FF66FF", "#FF66CC", "#FF6699", "#FF6666", "#FF6600", "#FF9900", "#FFFF00", "#CCFF00", "#66FF00", "#00FF00"];
    for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i);
    }
    return colors[hash % colors.length]
  }

  clear()
  {
    clearInterval(this.timerSubscription);
  }

  ngOnDestroy()
  {
    this.clear();
  }
  
}


