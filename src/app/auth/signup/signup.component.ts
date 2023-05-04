import { Component, ViewChild } from '@angular/core';
import { IUser } from '../Models/IUser';
import { IVendor } from '../Models/IVendor';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { MatTabGroup } from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent {
	@ViewChild('tabGroup') tabGroup: MatTabGroup;
	public userType: string;

	public userCredential : IUser = {
	  Email : "",
	  Name : "",
	  Password : "",
	  PhoneNumber : ""
	};
	submit = false;
	errorMessage = "";
	selectedServiceItems = [];
  
	public vendorCredential : IVendor = {
		Name : '',
		Email : "",
		Password : '',
		PhoneNumber : "",
		CompanyName : '',
		CompanyGSTNumber : '',
		CompanyAddress : '',
		ServiceProvide : []
	};
	serviceItems = [];
	selectedServicesControl = new FormControl('', Validators.required);

	public confirmPasswordValue : string = '';
	public vendorconfirmPasswordValue : string = '';
  
	categories = [
	  { name: "food-vendor", value: "food-vendor"},
	]
	constructor(private authService : AuthService,private fb: FormBuilder) { this.userType = "User"; }

	ngOnInit()
	{
		this.authService.getProvidedServices().subscribe((response : any) => {
			console.log(response);
			let serviceItems = response.map(item => item.serviceName)
			this.serviceItems = serviceItems;
		})

	}

	getSelectedTabIndex(): number {
		return this.tabGroup.selectedIndex;
	}
	
	MoveToLogin(){
	this.authService.MoveToLogin();
	}
	
	onSignUp()
	{
		console.log(this.selectedServiceItems);
		
		let Credential : any;
		console.log(this.getSelectedTabIndex());
		if(this.getSelectedTabIndex() == 0)
		{
			this.userType = "User";
			Credential = this.userCredential;
			if(this.confirmPasswordValue != Credential.Password)
			{
			  Swal.fire("Oops!","Password and Confirm Password Mismatch","error");
			  return;
			}
		}
		else
		{
			const values = [];
			for (let i = 0; i < this.selectedServiceItems.length; i++) {
			values.push(this.selectedServiceItems[i].value);
			}
			console.log(values);
			this.userType = "Vendor";
			this.vendorCredential.ServiceProvide = values;
			Credential = this.vendorCredential;
			if(this.vendorconfirmPasswordValue != Credential.Password)
			{
			  Swal.fire("Oops!","Password and Confirm Password Mismatch","error");
			  return;
			}
		}
		
	  
	 


	  
	  return this.authService.onSignUp(this.userType, Credential);
	 
	  
	}

}
