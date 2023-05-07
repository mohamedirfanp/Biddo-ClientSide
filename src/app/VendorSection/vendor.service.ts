
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http : HttpClient, private route : Router) { }

  ngOnInit()
  {
    
  }


  


  ListEvents()
  {
    return this.http.get(environment.API_URL + '/event/auctionEvents');
  }


  PlaceBid(eventId, selectedServiceName, bid)
  {
    return this.http.post(environment.API_URL + '/event/vendor/placeBid', { "EventId" : eventId, "SelectedServiceName" : selectedServiceName, "Bid" : bid});
  }

  UpdateBid(bidId:number, bid:number)
  {
    return this.http.post(environment.API_URL+ '/event/vendor/updateBid', { "BidId" : bidId, "Bid" : bid});
  }

  ListEventForVendor(filter : string)
  {
    return this.http.get(environment.API_URL + "/event/vendor/ListEvent/" + filter);
  }

}
