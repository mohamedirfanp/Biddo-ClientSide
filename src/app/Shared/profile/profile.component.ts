import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentProfile : any;
  vendorVisible : boolean = false;
  selectedServiceItems = [];
  serviceItems = [];
  visible: boolean;

  changePwd = {
	oldPassword : '',
	newPassword : '',
  }

  confirmPwd  = "";

  constructor(private route: Router, private sharedService : SharedService, private messageService : MessageService,private confirmationService: ConfirmationService, private authService : AuthService) {}

  ngOnInit()
  {
	this.getProfileDetails();
  }

  getProfileDetails()
  {
	
	this.sharedService.getProfile().subscribe((response : any) => {
		this.currentProfile = response.value;
		console.log(this.currentProfile);
		this.vendorVisible = this.currentProfile.ProvidedService.length !== 0;
		if(this.vendorVisible)
		{
		  this.serviceItems = this.getServiceName(this.currentProfile.ProvidedService);
		  console.log(this.serviceItems);
		  this.selectedServiceItems = this.serviceItems;
		}

	  }, (error) => {
		console.error(error);
		this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: error.message });
	  })
  }

  getServiceName(ProvidedService : any)
  {
	let serviceName = [];
	ProvidedService.forEach(service => {
	  serviceName.push(service.serviceName)
	});
	return serviceName;

  }

  showDialog() {
	this.visible = true;
  }
  closeDialog()
  {
	this.visible = false;
  }

  confirm(event: Event) {
	this.confirmationService.confirm({
		target: event.target,
		message: 'Are you sure that you want to proceed?',
		icon: 'pi pi-exclamation-triangle',
		accept: () => {
			if(this.vendorVisible)
			{
				if(this.selectedServiceItems.length === this.serviceItems.length) {
					this.selectedServiceItems = [];
				}
				else
				{
					this.selectedServiceItems = this.selectedServiceItems.map(x => typeof x === 'object' ? x.value : x)
					.filter(x => typeof x === 'string');

				}
			}
			this.sharedService.updateProfile(this.currentProfile.Profile,this.selectedServiceItems,this.vendorVisible).subscribe(data => {
				this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Details Updated Successfully' });
				this.getProfileDetails();
			}, (error) => {
				console.error(error);
				this.messageService.add({ severity: 'error', summary: 'Unknown Error', detail: 'Please Try again later' });
			})
		}
		// reject: () => {
		// 	this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
		// }
	});
}

	Submit()
	{
		if(this.changePwd.newPassword !== this.confirmPwd)
		{
			this.messageService.add({ severity: 'error', summary: 'Password Mismatch', detail: 'Please verify New Password and Confirm Password'});
			return;
		}

		this.sharedService.changePwd(this.changePwd).subscribe((response) => {
			this.messageService.add({ severity: 'success', summary:"Updated!!", detail: 'Successfully updated Password'});
			this.authService.onLogout();
		}, (error) => {
			console.error(error);
			this.messageService.add({ severity: 'error', summary:"ERROR!", detail: `${error.error}`});
		});

	}


  
}


