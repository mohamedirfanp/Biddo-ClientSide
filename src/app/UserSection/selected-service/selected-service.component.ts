import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../user.service';

@Component({
  selector: 'app-selected-service',
  templateUrl: './selected-service.component.html',
  styleUrls: ['./selected-service.component.css'],
})
export class SelectedServiceComponent {



  @Input() eventList : any = []; 

  @Output() closed = new EventEmitter<void>();
  visible = true;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private eventService : UserService) {}

  close() {
    this.visible = false;
    this.closed.emit();
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

  reschedule(eventId : number, selectedServiceId : number, selectedServiceName : string)
  {
    console.log(eventId, selectedServiceId, selectedServiceName);
  }

}
