import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { AppointmentType, Locations } from '../../shared/interface/GetAllLocations';
import { GlobalValuesService, LocationService } from '../../shared/services/global/global.service';
import { CommonService } from '../../shared/services/common/common.service';
import { RestapiService } from '../../shared/services/restapi/restapi.service';
import { TimeSlotService } from '../../shared/services/get-time-slots/time-slots.service';


@Component({
  selector: 'app-check-availablity-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-availablity-modal.component.html',
  styleUrl: './check-availablity-modal.component.scss'
})
export class CheckAvailablityModalComponent  implements OnInit {
  
  @Input() data: any;
  appointmentTypes: AppointmentType [] = [];
  providers: Array<any> = [];
  locations:Locations [] = [];
 
  rsaC_API_CLIENT_KEY! : string
  checkAvailabilityForm!: any;
  minDate!: string;


  selectedLocationID :any;
  selectedAppointmentID: any;
  selectedDate: any = new Date().toISOString().split('T')[0];
  appointmentSlotsList: any;
  useRequestForm: any;


  constructor(
    public activeModal: NgbActiveModal,
    private _restApiServices: RestapiService,
     private commonServices: CommonService,
     public modalService:NgbModal,
     private globalValuesService : GlobalValuesService,
     private locationService : LocationService,
     private timeSlotService : TimeSlotService
  ) { }



  ngOnInit() : void {
    this.getAllLocations();
    this.minDate = new Date().toISOString().split('T')[0];
  }

  

  getAllLocations() {
    this.rsaC_API_CLIENT_KEY = this.globalValuesService.get<any>('rsaC_API_CLIENT_KEY');
    let api = this.commonServices.apiParams(`GetAllLocations`,`?accessToken=noToken&clientDom=${this.rsaC_API_CLIENT_KEY}`);
    this._restApiServices.getData(api)
      .pipe(first()).subscribe({
        next: (res: any) => {
          this.locations = res?.locations;
          this.appointmentTypes = res?.appointmentTypes;
          this.providers = res.providers
        }, error: error => {
          console.log('getAllLocations', error);
        }, 
      });
  }



  
  onSubmit(event: Event) : void {
    const form = document.querySelector('form');
    if (form && form.checkValidity()) {
      this.getTimeSlots()
       event.preventDefault();
    } else {
      console.log('Form is invalid');
    }
  }
  

  onLocationChange(event:any){
    this.selectedLocationID = event?.target.value
    // this.locationService.setSelectedLocation(this.selectedLocationID);
    this.globalValuesService.set('selectedLocationID', this.selectedLocationID);
    event.preventDefault();
  }


  OnAppointmentTypeChange(event: any){
    console.log(event?.target.value)
    this.selectedAppointmentID = event?.target.value
    // this.locationService.setSelectedAppointment(this.selectedAppointmentID);
    this.globalValuesService.set('selectedAppointmentID', this.selectedAppointmentID);


  }
  
  OnDateChange(event: any){
      this.selectedDate = event.target.value;
  }

  OnProviderChange(event : any){
    this.providers = event?.target.value
    console.log('selectedDate',this.selectedDate)
  }

getTimeSlots() {
  const date = this.selectedDate;
  const appointmentTypeId = this.selectedAppointmentID;
  const locationId = this.selectedLocationID;

  this.timeSlotService.getTimeSlots(date, appointmentTypeId, locationId).subscribe((result : any) => {
  this.useRequestForm = result?.inquiryDetail.validate.useRequestForm;

    if (this.useRequestForm) {
      this.activeModal.close({
        component: 'RequestAppointmentDetailsModalComponent',
        value: { value:  {
          selectedlocationid: this.selectedLocationID,
          selectedAppointmentID : this.selectedAppointmentID,
          appointmentDate : this.selectedDate,
        }
      },
        config: { 
          Class: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal' 
        }
      }); 
    } else {
      this.activeModal.close({
        component: 'ConfirmAppointmentModalComponent',
        value: { value:  {
          selectedlocationid: this.selectedLocationID,
          selectedAppointmentID : this.selectedAppointmentID,
          appointmentDate : this.selectedDate,
        }
      },
        config: { 
          Class: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal' 
        }
      }); 
    }
  });
}


}
