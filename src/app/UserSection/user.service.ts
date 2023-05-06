
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from './Models/ITicket';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IEvent } from './Models/IEvent';
import { EventDto } from './Models/EventDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private route : Router) { }

  ngOnInit()
  {
    
  }


  getTickets()
  {
    return this.http.get(environment.API_URL + '/help');
  }

  editTicket(editTicket : any)
  {
    this.http.post(environment.API_URL + '/help',editTicket).subscribe((response) => {
      console.log(response);
      this.route.navigate(['/user/contactUs']);
    });
  }

  getProvidedServices()
  {
    return this.http.get<[]>(environment.API_URL + "/event/services");
  }

  createEvent(EventDTO : EventDto)
  {
    this.http.post(environment.API_URL + '/event/create', EventDTO).subscribe((response) => {
      Swal.fire("Success","Event Created Successfully","success");
      this.route.navigate(['/user/dashboard']);
    }, (error)=> {
      console.error(error);
      Swal.fire("Oops!", error.error, "error");
    })
  }


  ListEvents()
  {
    return this.http.get(environment.API_URL + '/event/user/ListEvents');
  }


  updateWinnerForService(eventId : number, selectedServiceId : number, bidId : number, vendorId : number)
  {
    return this.http.post(environment.API_URL + '/event/update/winner', {eventId : eventId, selectedServiceId : selectedServiceId , bidId : bidId, vendorId : vendorId})
  }
  
  rescheduleAuction(eventId : number, selectedServiceId : number, selectedServiceName : string)
  {
    return this.http.post(environment.API_URL + '/event/reschedule/auction', {eventId : eventId, selectedServiceId : selectedServiceId, selectedServiceName : selectedServiceName})
  }


}
