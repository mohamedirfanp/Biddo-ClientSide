import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-service',
  templateUrl: './selected-service.component.html',
  styleUrls: ['./selected-service.component.css'],
})
export class SelectedServiceComponent {



  @Input() eventList : any = []; 

  @Output() closed = new EventEmitter<void>();
  visible = true;
  ratingVisible : boolean = false;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private eventService : UserService, private route : Router) {}

  close() {
    this.visible = false;
    this.closed.emit();
  }

  
  closeDialog()
    {
    this.ratingVisible = false;
    }


  confirm1(serviceIdx : number, bidIdx : number) {
    let currentService = this.eventList[0].Services[serviceIdx].selectedService;
    let currentBid = this.eventList[0].Services[serviceIdx].bidList[bidIdx];
    console.log(currentBid);
    this.confirmationService.confirm({
      message: `Are you sure that you want to confirm? SelectedService : ${currentService.selectServiceName} on Quoted Price: ${currentBid.bid}`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          console.log("herer",currentService,currentBid);
          this.eventService.updateWinnerForService(currentService.eventId, currentService.selectedServiceId, currentBid.bidId, currentBid.vendorId).subscribe((response) => {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Successfully Updated' });
              console.log(response);
              this.route.navigate(['/user/dashboard']);

            }, (error) => {
              console.error(error);
            })

        },
        reject: (type) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have cancelled' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}

rescheduleAuction(eventId : number, selectedServiceId : number, selectedServiceName : string)
  {
    this.eventService.rescheduleAuction(eventId, selectedServiceId, selectedServiceName).subscribe((response) => {
      this.messageService.add({ severity: 'success', summary: 'Rescheduled', detail: 'Successfully Rescheduled' });
      this.route.navigate(['/user/dashboard']);
    },(error) => {
      console.error(error);
      this.messageService.add({severity : 'error', summary : 'Unknown Error', detail : 'Please try again later'});
    }
    );
  }

  MoveToChat()
  {
    return this.eventService.MoveToChat();
  }
}