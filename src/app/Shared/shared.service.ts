import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IVendor } from '../auth/Models/IVendor';
import { IUser } from '../auth/Models/IUser';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http : HttpClient) { }


  getProfile()
  {
    return this.http.get(environment.API_URL + '/auth/profile');
  }

  updateProfile(newProfile : any, selectedService : string[], isVendor : boolean)
  {
    if(isVendor)
		{

      var newProfileVendor : IVendor = {
        Name : newProfile.vendorName,
        PhoneNumber : `${newProfile.vendorPhoneNumber}`,
        CompanyAddress : newProfile.vendorLocation,
        isServiceChanged : selectedService.length > 0 ? true : false,
        ServiceProvide : selectedService,
        Email : newProfile.vendorEmail,
        CompanyGSTNumber : newProfile.vendorGSTNumber,
        CompanyName : newProfile.vendorCompanyName,
        Password : ''
      };
      
      console.log(selectedService);

      return this.http.post(environment.API_URL + '/auth/vendor/profile', newProfileVendor);
				
		}
    else
    {
      var newProfileUser : IUser = {
        "Name" : newProfile.name,
        "Email" : newProfile.email,
        "PhoneNumber" : `${newProfile.phoneNumber}`,
        "Password" : ''
      }
      return this.http.post(environment.API_URL + '/auth/user/profile', newProfileUser);
    }
  }

  changePwd(changePwdCred)
  {
    return this.http.post(environment.API_URL + '/auth/change-password', changePwdCred);
  }


  getConversations()
  {
    return this.http.get(environment.API_URL + '/chat/get/conversations');
  }

  getChats(conversationId : number)
  {
    console.log(conversationId);
    return this.http.get(environment.API_URL + '/chat/get/chats/' + conversationId);
  }

  sendMessage(message : string, conversationId : number)
  {
    return this.http.post(environment.API_URL + '/chat/send/message', {message : message, conversationId : conversationId})
  }

}
