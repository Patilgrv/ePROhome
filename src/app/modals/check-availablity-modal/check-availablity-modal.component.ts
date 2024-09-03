import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { AppointmentType, Locations } from '../../shared/interface/GetAllLocations';
import { GlobalValuesService, LocationService } from '../../shared/services/global/global.service';
import { CommonService } from '../../shared/services/common/common.service';
import { RestapiService } from '../../shared/services/restapi/restapi.service';
import { TimeSlotService } from '../../shared/services/get-time-slotss/time-slots.service';


@Component({
  selector: 'app-check-availablity-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-availablity-modal.component.html',
  styleUrl: './check-availablity-modal.component.scss'
})
  export class CheckAvailabilityModalComponent  implements OnInit {
  
  @Input() data: any;
  appointmentTypes: AppointmentType [] = [];
  providers: Array<any> = [];
  locations:Locations [] = [];
 
  rsaC_API_CLIENT_KEY! : string
  checkAvailabilityForm!: any;
  minDate!: string;


  selectedLocationID :any;
  selectedAppointmentID: any;
  selectedproviderID: any;
  selectedDate: any = new Date().toISOString().split('T')[0];
  appointmentSlotsList: any;
  useRequestForm: any;


  constructor(
    public activeModal: NgbActiveModal,
    private _restApiServices: RestapiService,
     private commonServices: CommonService,
     public modalService:NgbModal,
     private globalValuesService : GlobalValuesService,
     private timeSlotService : TimeSlotService,
  ) { }

 

  ngOnInit() : void {
    this.getAllLocations();
    this.minDate = this.selectedDate;  // disable previous dates
    this.globalValuesService.set('selectedDate', this.selectedDate);
    this.globalValuesService.set('rsaC_PERSON_SRC_ID', '0');
  }

  

  getAllLocations() {
    this.rsaC_API_CLIENT_KEY = this.globalValuesService.get<any>('rsaC_API_CLIENT_KEY');
    let api = this.commonServices.apiParams(`RSACSchedulerSlotParameters`,``);
    this._restApiServices.getData(api)
      .pipe(first()).subscribe({
        next: (res: any) => {
          this.locations = res?.locations;
          this.appointmentTypes = res?.appointmentTypes;
          this.providers = res.providers

          this.globalValuesService.set('locations', (this.locations));
          this.globalValuesService.set('appointmentTypes', (this.appointmentTypes));
          this.globalValuesService.set('providers', (this.providers));
        }
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
    this.globalValuesService.set('selectedLocationID', this.selectedLocationID);
  }


  OnAppointmentTypeChange(event: any){
    this.selectedAppointmentID = event?.target.value
    this.globalValuesService.set('selectedAppointmentID', this.selectedAppointmentID);
  }
  
  OnDateChange(event: any){
    this.selectedDate = event.target.value;
    this.globalValuesService.set('selectedDate', this.selectedDate);

  }

  OnProviderChange(event : any){
    this.selectedproviderID = event?.target.value
    this.globalValuesService.set('rsaC_PERSON_SRC_ID', this.selectedproviderID);
  }

  getTimeSlots() {
  const date = this.selectedDate;
  const appointmentTypeId = this.selectedAppointmentID;
  const locationId = this.selectedLocationID;
  const providerSrcId = this.selectedproviderID || '0'

  this.timeSlotService.getTimeSlots(date, appointmentTypeId, locationId, providerSrcId).subscribe((result : any) => {  //used for navigation value only
  this.useRequestForm = result?.inquiryDetail?.validate?.useRequestForm;

    if (this.useRequestForm) {
      this.activeModal.close({
        component: 'RequestAppointmentDetailsModalComponent',
        value: { value:  {
          locations:  this.locations,
          appointmentTypes : this.appointmentTypes,
          providers : this.providers,
          appointmentDate : this.selectedDate,
        }
      },
        config: { 
          class: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal' 
        }
      }); 
    } else {
      this.activeModal.close({
        component: 'ConfirmAppointmentModalComponent',
        value: { value:  {
          locations:  this.locations,
          appointmentTypes : this.appointmentTypes,
          providers : this.providers,
          // selectedlocationid: this.selectedLocationID,
          // selectedAppointmentID : this.selectedAppointmentID,
          appointmentDate : this.selectedDate,
        }
      },
        config: { 
          class: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal'
        }
      }); 
    }
  });
}


}
