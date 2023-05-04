import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Ticket } from '../Models/ITicket';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  tickets: Ticket[] = []; 

  editTicket = {
    ticketId : '',
    ticketDescription : ''
  }


  /**
   *
   */
  constructor(private userService : UserService) {
  }


  ngOnInit()
  {
    this.userService.getTickets().subscribe((response : Ticket[])=>{
        this.tickets = response;
        console.log(response);
    }, (error)=>{
      console.log(error);
    });
  }

  timeRemaining(ticketCreatedAt: Date): string {
    const ticketCreated = new Date(ticketCreatedAt);
    const now = new Date();
    const timeDiff = now.getTime() - ticketCreated.getTime();
    const minutesAgo = Math.floor(timeDiff / (1000 * 60));
    
    if (minutesAgo >= 60) {
      const daysAgo = Math.floor(minutesAgo / 60 / 24);
      return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    }
    
    return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  }

  OnChange()
  {
    return this.userService.editTicket(this.editTicket);
  }
  
}
