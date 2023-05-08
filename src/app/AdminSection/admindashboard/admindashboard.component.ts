import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
	selector: 'app-admindashboard',
	templateUrl: './admindashboard.component.html',
	styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
	filter : any = "User"
	ChoosenList : any[];
	displayedColumns: string[] = ['userId', 'name', 'email', 'phoneNumber'];
	displayedColumnsVendor: string[] = ['vendorId', 'name', 'email', 'phoneNumber', 'vendorCompanyName', 'vendorGSTNumber', 'vendorLocation'];

	constructor(private adminService : AdminService) {}

	ngOnInit()
	{
		this.getDetails(this.filter);
	}

	getDetails(filter : string)
	{
		this.adminService.getDetails(this.filter).subscribe((response : any[]) => {
			this.ChoosenList = response[0];
			console.log(this.ChoosenList);
		}, (error)=> {
			console.error(error);
		})	
	}

	onFilterChange(event)
	{
		this.filter = event.target.value;
		this.getDetails(this.filter);
	}
}
