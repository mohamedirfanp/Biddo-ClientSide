import { Component } from '@angular/core';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendordashboard',
  templateUrl: './vendordashboard.component.html',
  styleUrls: ['./vendordashboard.component.css']
})
export class VendordashboardComponent {

  EventList : any = [];

  constructor(private vendorService : VendorService) {
    
  }

  ngOnInit()
  {
    this.vendorService.ListEventForVendor().subscribe((response)=>{
      this.EventList =response;
    }, (error)=>{
      console.log(error);
    })

  }
  
}
