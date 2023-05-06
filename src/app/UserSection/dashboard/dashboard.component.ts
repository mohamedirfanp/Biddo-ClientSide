import { Component,Inject, NgModule } from '@angular/core';
import { UserService } from '../user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

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
  visible: boolean;
  visibleService :boolean;
  SelectedList : any = [];



  constructor(private eventService : UserService, private dialog : MatDialog) {

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
    console.log(index);
  }

  onChildClosed() {
    this.visibleService = false;
    this.SelectedList = [];
  }


  onFilterChange(event)
  {
    this.getDetails();
  }

  getDetails()
  {

    this.eventService.ListEvents().subscribe((response) => {
      console.log(response)
      this.EventList = response;
    },(error)=>{
      console.error(error);
    })
    // this.eventhandler.getAppointment(this.filter,this.searchInput).subscribe((data) => {
    // this.appointmentsList = data;
    
    //   }, (err) => {
    //       Swal.fire("Oops!",err.error.message,"error");
    //   });
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
