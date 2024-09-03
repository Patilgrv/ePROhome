import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlobalValuesService, LocationService } from '../../shared/services/global/global.service';
import { AppointmentType, Locations } from '../../shared/interface/GetAllLocations';
import { CommonService } from '../../shared/services/common/common.service';
import { RestapiService } from '../../shared/services/restapi/restapi.service';
import { CalenderModalComponent } from '../calender-modal/calender-modal.component';
import Swal from 'sweetalert2'
import { TimeSlotService } from '../../shared/services/get-time-slotss/time-slots.service';

@Component({
  selector: 'app-confirm-appointment-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirm-appointment-modal.component.html',
  styleUrl: './confirm-appointment-modal.component.scss',
})
export class ConfirmAppointmentModalComponent {
  accesstoken!: string;
  clientid!: number;
  rsaC_API_CLIENT_KEY!: string;
  pageTitle!: string;
  appointmentTypes: AppointmentType[] = [];
  providers: any;
  locations: Locations[] = [];
  appointmentSlotsList: any = [];
  @Input() data: any;
  slotID!: any;

  constructor(
    private commonServices: CommonService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private globalValuesService : GlobalValuesService,
    private locationService : LocationService,
    private timeSlotService : TimeSlotService
    


  ) {}

  appointmentForm!: FormGroup;
  useRequestForm: boolean = false;
  selectedProviderId!: string;

  

  ngOnInit() {
    this.initForm();     // first initialize the form
    const selectedAppointmentID = this.globalValuesService.get<any>('selectedAppointmentID');
    const selectedlocationid = this.globalValuesService.get<any>('selectedLocationID');
    const Providerid = this.globalValuesService.get<any>('rsaC_PERSON_SRC_ID');
    this.selectedProviderId = Providerid;
    
    this.appointmentForm.patchValue({ location: selectedlocationid });
    this.appointmentForm.patchValue({ appointmentType: selectedAppointmentID });
    this.appointmentForm.patchValue({ provider: Providerid });
    this.getClientValues();
    this.getTimeSlots();

  }


  initForm() {
    this.appointmentForm = this.fb.group({
      location: ['', Validators.required],
      appointmentType: ['', Validators.required],
      provider: [''],
      // slots: ['', Validators.required],
    });
  }


  getClientValues(){
    this.locations = this.globalValuesService.get<any>('locations');
    this.appointmentTypes = this.globalValuesService.get<any>('appointmentTypes');
    this.providers = this.globalValuesService.get<any>('providers');
  }
  
  getTimeSlots() {     //method to get the time slots during navigation only
    const date = this.globalValuesService.get<any>('selectedDate');
    const appointmentTypeId = this.globalValuesService.get<any>('selectedAppointmentID');
    const locationId = this.globalValuesService.get<any>('selectedLocationID');
    const providerSrcId = this.globalValuesService.get<any>('rsaC_PERSON_SRC_ID');
    this.timeSlotService.getTimeSlots(date, appointmentTypeId, locationId, providerSrcId).subscribe((result : any) => {
    this.appointmentSlotsList = result?.appointmentSlots;
    });
  }


  updatedSlots(){  // method to get the updated slots during drop-down change /calendar modal 
    const date = this.globalValuesService.get<any>('selectedDate');
    const appointmentTypeId = this.appointmentForm.get('appointmentType')?.value;
    const locationId = this.appointmentForm.get('location')?.value;
    const providerSrcId = this.appointmentForm.get('provider')?.value;

    this.globalValuesService.set('selectedAppointmentID', appointmentTypeId);
    this.globalValuesService.set('selectedLocationID', locationId);
 
  
    this.timeSlotService.getTimeSlots(date, appointmentTypeId, locationId, providerSrcId).subscribe((result : any) => {
    this.appointmentSlotsList = result?.appointmentSlots;

    this.useRequestForm = result?.inquiryDetail?.validate?.useRequestForm;

    // family eye exam is selected will navigate to other component
    if (this.useRequestForm) {
      this.activeModal.close({
        component: 'RequestAppointmentDetailsModalComponent',
        value: {},
        config: { 
          class: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal' 
        }
      }); 
    }});
  }


  

  calendarPopup() {
    this.commonServices.openModal(CalenderModalComponent, {}, { })
    .then(date => {
      if (date) {
        this.globalValuesService.set('selectedDate', date);
        this.updatedSlots();        
      }
    });
  }

    // const currentDate = this.globalValuesService.get<any>('selectedDate');
    getPreviousWeekDate() {
      const date = this.globalValuesService.get<any>('selectedDate');
      if (date) {
        const currentDate = new Date(date);
        const previousWeekDate = new Date(currentDate);
        previousWeekDate.setDate(previousWeekDate.getDate() - 7);
        const today = new Date();
        
        if (previousWeekDate < today) {
          this.globalValuesService.set('selectedDate', today);
        } else {
          this.globalValuesService.set('selectedDate', previousWeekDate);
        }
        
        this.updatedSlots();
      }
    }

  nextWeekdates(){}

  ConfirmAppointment($event : any): void {
    if (this.appointmentForm.valid && this.slotID) {
      this.activeModal.close({
        component: 'RequestAppointmentDetailsModalComponent',
        value: {},
        config: { 
          class: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal' 
        }
      }); 
    } else {
      Swal.fire({
        text: "Please select an appointment time",
        confirmButtonText: "OK",
        showClass: {
          popup: 'swal2-show',
          backdrop: 'swal2-backdrop-hide',
          icon: 'swal2-icon-show'
        },
        backdrop: false,
      });
    }};




    isCurrentSelected(slot: any): boolean {
      return this.slotID && this.slotID.rsaC_APPT_SLOT_SRC_ID === slot.rsaC_APPT_SLOT_SRC_ID;
    }
  
 

    OnselectedSlot(event: Event, slotId: string): void {
      console.log('selectSlot called',slotId);
      this.slotID = slotId;
      // event.preventDefault(); 
      // event.stopPropagation();
    }
  
}





  // getTimeSlotss() {
  //     let date = this.data.value.appointmentDate;
  //     let appointmentTypeId = this.data.value.selectedAppointmentID;
  //     let inquiryId = "51539";
  //     let locationSrcId = this.data.value.selectedlocationid;
  //     let showMaxDays = true; 
  //     let providerSrcId = "0";
  //     let clientDom = this.globalValuesService.get<any>('rsaC_API_CLIENT_KEY');
    

  //   let apiUrl = this.commonServices.apiParams(
  //     `GetTimeSlots`,
  //     `?date=${date}&appointmentTypeId=${appointmentTypeId}&inquiryId=${inquiryId}&clientDom=${clientDom}&locationSrcId=${locationSrcId}&ShowMaxDays=${showMaxDays}&ProviderSrcID=${providerSrcId}`
  //   );

  //   this._restApiServices
  //     .getData(apiUrl)
  //     .pipe(first())
  //     .subscribe({
  //       next: (res: any) => {
  //         this.appointmentSlotsList = res?.appointmentSlots;
  //         console.log('this.appointmentSlotsList', this.appointmentSlotsList);
  //       },
  //     });
  // }



  
  // getAllLocations(): void {
  //   let clientDom = this.globalValuesService.get<any>('rsaC_API_CLIENT_KEY');
  //   let api = this.commonServices.apiParams(
  //     `GetAllLocations`,
  //     `?accessToken=noToken&clientDom=${clientDom}`
  //   );
  //   this._restApiServices
  //     .getData(api)
  //     .pipe(first())
  //     .subscribe({
  //       next: (res: any) => {
  //         this.locations = res?.locations;
  //         this.appointmentTypes = res?.appointmentTypes;
  //         this.providers = res.providers;

  //         this.locations = this.data.value.locations
  //         this.appointmentTypes = this.data.value.appointmentTypes
  //         this.providers = this.data.value.providers
  //         this.getTimeSlots();
  //       }
  //     });

  //     const selectedLocationID = this.appointmentForm.get('location')?.value;
  //     const appointmentTypeID = this.appointmentForm.get('appointmentType')?.value;

 
  //     this.globalValuesService.set('selectedLocationID', selectedLocationID);
  //     this.globalValuesService.set('selectedAppointmentID',appointmentTypeID);

  // }