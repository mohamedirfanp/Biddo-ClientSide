import { Component,Inject, NgModule } from '@angular/core';
import { UserService } from '../user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MessageService } from 'primeng/api';

export interface EventInfo {
  eventName : string;
  eventDescription : string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  filter : string = 'all';
  searchInput : string = "";
  EventList : any = [];
  idx = 0;
  selectedServiceIdx: string = '-1';
  
  visible: boolean;
  visibleService :boolean;
  ratingVisible : boolean;
  isSubmitClicked = false;


  SelectedList : any = [];
  selectedRatingList : any = [];

  value : number;


  constructor(private eventService : UserService, private dialog : MatDialog,private messageService: MessageService) {

  }
  

  ngOnInit()
  {
    this.getDetails();
  }


  openDialog(index : number) {
    let selectedEvent: EventInfo;
    console.log()
   

    this.dialog.open(EventInfoDialog, {
      data : {...this.EventList[index].Event}
    });
  }


  showService(index : number, event: any)
  {
    if(!event.SelectedList  || event.SelectedList.length > 0)
    {
      event.SelectedList = [];
    }
    event.SelectedList.push(this.EventList[index]);
  }

  showVendor(index : number)
  {
    this.selectedRatingList = this.EventList[index];
    console.log(this.selectedRatingList);
    this.ratingVisible = true;
  }

  closeVendor()
  {
    this.ratingVisible = false;
    this.selectedServiceIdx = '-1';
    this.selectedRatingList = [];
    this.isSubmitClicked = false;
  }

  onChildClosed() {
    this.visibleService = false;
    this.SelectedList = [];
  }


  onFilterChange(event)
  {
    this.filter = event.target.value;
    console.log(this.filter);
    this.getDetails();
  }

  getDetails()
  {
    this.eventService.ListEvents(this.filter).subscribe((response) => {
      console.log(response)
      this.EventList = response;
    },(error)=>{
      console.error(error);
    })
  }

  OnSubmitRating()
  {
    this.isSubmitClicked = true;
    if (!this.selectedRatingList.Services[this.selectedServiceIdx].userreview || !this.selectedRatingList.Services[this.selectedServiceIdx].ratingvalue) {
        return;
    }
    console.log(this.selectedRatingList);

    this.eventService.addRating(this.selectedRatingList.Event.eventId,this.selectedRatingList.Services[this.selectedServiceIdx].selectedService.selectedServiceId,this.selectedRatingList.Services[this.selectedServiceIdx].selectedService.selectServiceName, this.selectedRatingList.Services[this.selectedServiceIdx].vendorList[0].vendorId, this.selectedRatingList.Services[this.selectedServiceIdx].userreview, this.selectedRatingList.Services[this.selectedServiceIdx].ratingvalue).subscribe((response)=>{
      console.log(response);
      this.messageService.add({severity : "success", summary : "Updated Rating", detail : "Successfully Updated Rating"});
      this.closeVendor();
      this.getDetails();
      
    }, (error)=>{
      console.log(error);
    })


  }

}

@Component({
  selector: 'event-info',
  templateUrl: 'event-info.html',
  styleUrls: ['event-info.css']
})

export class EventInfoDialog {

  constructor(
    public dialogRef: MatDialogRef<EventInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
