import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { IEvent } from '../Models/IEvent';
import { SelectedService } from '../Models/ISelectedService';
import { EventDto } from '../Models/EventDto';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.css']
})
export class EventComponent {


	newEvent : IEvent = {
		EventName : '',
		EventDate : '',
		EventAddress : '',
		EventDescription : '',
		EventTime : '',
		TotalParticipates : 0
	};

	eventForm: FormGroup;
	addressForm: FormGroup;
	serviceForm: FormGroup;
	budgetForm: FormGroup;
	// array to store the service form groups
	serviceForms: FormGroup[] = [];

	today : Date;
	
	// property to hold the combined form data
	eventData: any = {};
	isLinear : boolean = true;
  
	// available service options
	serviceOptions : any = [];
	  errorVisble = false;
	  checkedOptions = [];
	  isChecked = [false, false, false, false];
	  errorMsg="";
	  submit = false;
	  
	selectedItem: any;
	selectedOptions: boolean[] = [];
	

	
  
	constructor(private fb: FormBuilder, private eventService : UserService) { 
		this.today = new Date();
	}
	
  
	ngOnInit(): void {
	  // create step 1 form
	  this.eventForm = this.fb.group({
		eventName: ['', Validators.required],
		eventDescription: ['', Validators.required],
		eventDate: ['', Validators.required],
		eventTime: ['', Validators.required],
		totalParticipates: ['', [Validators.required, Validators.min(1)]]
	  });
  
	  
	  // create step 2 form
	  this.addressForm = this.fb.group({
		addressLane: ['', Validators.required],
		city: ['', Validators.required],
		state: ['', Validators.required],
		pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
		
	  });

	  // create step 4 form
	  this.budgetForm = this.fb.group({
		serviceName: ['', Validators.required],
		minBudget: ['', [Validators.required, Validators.min(0)]],
		maxBudget: ['', [Validators.required, Validators.min(0)]]
	  });


	  this.eventService.getProvidedServices().subscribe((response) => {
		this.serviceOptions = response;
		console.log(this.serviceOptions);
	  });
	}
	
	setSelectedItem(item: any) {
		this.selectedItem = item;
		}

  get atLeastOneSelected(): boolean {
	return this.selectedOptions.some(selected => selected);
  }

  onCheckboxChange(event: Event, index: number) {
	this.selectedOptions[index] = (event.target as HTMLInputElement).checked;
  }

  submitForm() {
	if (!this.atLeastOneSelected) {
	  console.log('Please select at least one option');
	  return;
	}
	this.serviceForms = [];
	for(let i=0; i < this.checkedOptions.length;i++)
	{
		this.serviceForms.push(
			this.fb.group({	
			  minBudget: ['', Validators.required],
			  maxBudget: ['', Validators.required]
			})
		  );
	}
	}

  
	// helper method to get the form control for provided services in step 3
	getprovidedServices() {
	  return this.serviceForm.get('providedServices');
	}
  
	// handler for step 3 submit button
	onSubmitServices() {

		let selectedServices : SelectedService[] = []
		 // loop through the service form groups to get the form data
		 this.serviceForms.forEach((group, index) => {
			 // do something with the minBudget and maxBudget values for each service option
			 const minBudget : number = group.get('minBudget').value;
			 const maxBudget : number = group.get('maxBudget').value;
			 const serviceName : string = this.checkedOptions[index];

			let service : SelectedService = {
				SelectServiceName : '',
				MinBudget : 0,
				MaxBudget : 0
			};
			
			service.SelectServiceName = serviceName;
			service.MinBudget = minBudget;
			service.MaxBudget = maxBudget;

			selectedServices.push(service);
		  });
	  // combine form data into the eventData object
	  let CombinedAddress = `${this.addressForm.get('addressLane').value},${this.addressForm.get('city').value},${this.addressForm.get('state').value},${this.addressForm.get('pincode').value}`;

	  this.eventData = { ...this.eventData, ...this.eventForm.value,};


	  
	  this.newEvent.EventName = this.eventForm.get('eventName').value;
	  this.newEvent.EventDate = (this.eventForm.get('eventDate').value).toISOString().substring(0, 10);
	  this.newEvent.EventAddress = CombinedAddress;
	  this.newEvent.EventDescription = this.eventForm.get('eventDescription').value;
	  this.newEvent.EventTime = this.eventForm.get('eventTime').value;
	  this.newEvent.TotalParticipates = this.eventForm.get('totalParticipates').value;

	  let EventDTO : EventDto = {
		Event : this.newEvent,
		SelectedServices : selectedServices
	  };

	  console.log(this.newEvent.EventDate);


	  this.eventService.createEvent(EventDTO);
 
	}

	// getcheckboxes(){
	// 	return this.serviceForm.get('checkboxes') as FormArray;
	//   }
	updateCheckedOptions(event: any, value: string, id : number) {
		this.isLinear = false;
		if (event.target.checked) {
		  this.checkedOptions.push(value);
		} else {
		  const index = this.checkedOptions.indexOf(value);
		  if (index > -1) {
			this.checkedOptions.splice(index, 1);
		  }
		}
		console.log(this.checkedOptions)
	  }
	


}
