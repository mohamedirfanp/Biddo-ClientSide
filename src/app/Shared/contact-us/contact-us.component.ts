import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  TicketsList : any[];
  chatList : any[];
  chatGroups : any[];
  currentIdx : number = -1;

  createTicketVisible : boolean = false;
  isSubmitted : boolean = false;

  currentRole : string;


  newTicket : ITicket = 
  {
    TicketTitle : "",
    TicketDescription : "",
    TicketType : "Query"
  }

  constructor(private sharedService : SharedService,private messageService : MessageService ) {
    
  }
  ngOnInit() {
    this.currentRole = sessionStorage.getItem('Role');
    this.getTickets();
  }



  getTickets()
  {
    if(this.currentRole !== "Admin" )
    {
      this.sharedService.getTickets().subscribe((response : any[]) => {
        this.TicketsList = response;
  
        console.log(this.TicketsList);
      }, (error) => {
        console.error(error);
      })
    }
    else
    {
      this.sharedService.getAllTickets().subscribe( (response: any[]) => {
        this.TicketsList = response;
      }, (error) => {
        console.error(error);
      });
    }
  }

  onShowChat(ticketId : number, currentIdx : number)
  {
    this.currentIdx = currentIdx;
    this.sharedService.getChatForTickets(ticketId).subscribe((response : any[]) => {
      this.chatList = response;
      this.chatGroups = this.groupChatsByDate(this.chatList);
      console.log(response);

    }, (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: error.message });
    });
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



  timeCreated(ticketCreatedAt : Date) : string 
  {
    const date = new Date(ticketCreatedAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  }

  sendMessage()
  {
    const message = this.TicketsList[this.currentIdx].message;
    const ticketId = this.TicketsList[this.currentIdx].queryId;

    console.log(message, ticketId);

    this.sharedService.sendMessageForTicket(message, ticketId).subscribe((response) => {
      console.log(response);
      this.onShowChat(ticketId, this.currentIdx);
      this.TicketsList[this.currentIdx].message = "";
    },(error) => {
      console.error(error);
    });
  }

  closeDialog()
  {
    this.createTicketVisible  =false;
    this.newTicket = 
      {
        TicketTitle : "",
        TicketDescription : "",
        TicketType : "Query"
      }
  }

  showCreateTicket()
  {
    this.createTicketVisible  =true;
  }

  CreateTicket()
  {
    this.isSubmitted = true;
    if(this.newTicket.TicketTitle === '' || this.newTicket.TicketDescription === '')
    {
      return;
    }
    this.sharedService.createTicket(this.newTicket).subscribe((response : any) => {
      console.log(response);
      this.TicketsList = response;
      this.newTicket = 
      {
        TicketTitle : "",
        TicketDescription : "",
        TicketType : "Query"
      }
      this.messageService.add({severity : "success", summary : "Ticket Created", detail : "Successfully Ticket Created"})
      this.isSubmitted = false;
      this.closeDialog();
    }
    ,(error) => {
      console.error(error);
      this.messageService.add({severity : "error", summary : "Unknown Error", detail : "Please try again later"})
      });

  }

  closeTicket()
  {
    console.log();
    this.sharedService.closeTicketStatus(this.TicketsList[this.currentIdx].queryId).subscribe((response) => {
      console.log(response);
      this.messageService.add({severity : "success", summary : "Ticket Close", detail : "Successfully Ticket Closed"})
      this.onShowChat(this.TicketsList[this.currentIdx].queryId, this.currentIdx);
    }, (error) => {
      console.error(error);
      this.messageService.add({severity : "error", summary : "Unknown Error", detail : "Please try again later"})
    });
  }


}

export interface ITicket
{
  TicketTitle : string;
  TicketDescription : string;
  TicketType : string;
}