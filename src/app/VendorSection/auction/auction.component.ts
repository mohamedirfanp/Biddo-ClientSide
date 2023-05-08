import { Component } from '@angular/core';
import { VendorService } from '../vendor.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
  providers : [MessageService]
})
export class AuctionComponent {

  public eventList;
  public quotedPrice;

  bidSubmitted : boolean = false;

  constructor(private eventService : VendorService,private messageService: MessageService, private route : Router) {

  }
  ngOnInit()
  {
    this.getDetails();
  }

  getDetails()
  {
    this.eventService.ListEvents().subscribe((response) => {
      this.eventList = response;
      console.log(this.eventList);
      
    },(error)=>{
      console.error(error);
    })
    
  }

  placeBid(eventId: number, selectedServiceName: string, bid : number, minBudget : number) {
    // this.bidSubmitted = true; 
    if(bid < minBudget)
    {
      this.bidSubmitted = true;
      return ;
    }
    else 
    {
      this.eventService.PlaceBid(eventId, selectedServiceName, bid).subscribe((response) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bid Placed Successfully' });
        this.getDetails();
      },(error) => {
        console.error(error);
      });
    }

  }
  updateBid(bidId : number, bid : number, existingBid : number)
  {
    if(!(bid > (existingBid-100)))
    {
      this.bidSubmitted = true;
      return;
    }
    else
    {
      this.eventService.UpdateBid(bidId,bid).subscribe((response)=>{
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bid Updated Successfully' });
        this.getDetails();
      },(error)=>{
        console.error(error);
        Swal.fire('Oops!',error.error,"error");
      })

    }
  }
}
