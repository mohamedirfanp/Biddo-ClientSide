import { Component } from '@angular/core';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendordashboard',
  templateUrl: './vendordashboard.component.html',
  styleUrls: ['./vendordashboard.component.css']
})
export class VendordashboardComponent {

  EventList : any = [];
  selectedService : any = [];
  filter : string = 'all';

  constructor(private vendorService : VendorService) {
    
  }

  ngOnInit()
  {
    this.getEventList();

  }

  getEventList()
  {
    this.vendorService.ListEventForVendor(this.filter).subscribe((response : any)=>{
      this.EventList =response[0];
      this.selectedService = response[1];
      console.log(this.EventList);
      console.log(this.selectedService);
    }, (error)=>{
      console.log(error);
    })
  }

  onFilterChange(event)
  {
    this.filter = event.target.value;
    this.getEventList();
  }
  
}
