import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckAvailablityModalComponent } from '../../modals/check-availablity-modal/check-availablity-modal.component';
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
import { TimeSlotService } from '../../shared/services/get-time-slots/time-slots.service';

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

  constructor(
    private _restApiServices: RestapiService,
    private http: HttpClient,
    private commonServices: CommonService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private globalValuesService : GlobalValuesService,
    private locationService : LocationService,
    private timeSlotService : TimeSlotService
    


  ) {}

  appointmentForm!: FormGroup;

  ngOnInit() {
    // this.getClient();
    this.initForm();    
    this.getAllLocations();

    console.log(this.data)
    const selectedAppointmentID = this.globalValuesService.get<any>('selectedAppointmentID');
    console.log('selectedAppointmentID', selectedAppointmentID);
    
    const selectedlocationid = this.globalValuesService.get<any>('selectedLocationID');


    this.appointmentForm.patchValue({ location: selectedlocationid });
    this.appointmentForm.patchValue({ appointmentType: selectedAppointmentID });

    this.getTimeSlots();

  }

  

  initForm() {
    this.appointmentForm = this.fb.group({
      location: ['', Validators.required],
      appointmentType: ['', Validators.required],
      provider: [''],
      slot: ['', Validators.required],
    });
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

  getTimeSlots() {
    const date = this.data.value.appointmentDate;
    const appointmentTypeId = this.data.value.selectedAppointmentID;
    const locationId = this.data.value.selectedlocationid;;
  
    this.timeSlotService.getTimeSlots(date, appointmentTypeId, locationId).subscribe((result : any) => {
    this.appointmentSlotsList = result?.appointmentSlots;
    });
  }




  getAllLocations(): void {
    let clientDom = this.globalValuesService.get<any>('rsaC_API_CLIENT_KEY');
    let api = this.commonServices.apiParams(
      `GetAllLocations`,
      `?accessToken=noToken&clientDom=${clientDom}`
    );
    this._restApiServices
      .getData(api)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.locations = res?.locations;
          this.appointmentTypes = res?.appointmentTypes;
          this.providers = res.providers;
          this.getTimeSlots();
        }
      });

      const selectedLocationID = this.appointmentForm.get('location')?.value;
      const appointmentTypeID = this.appointmentForm.get('appointmentType')?.value;

 
      this.globalValuesService.set('selectedLocationID', selectedLocationID);
      this.globalValuesService.set('selectedAppointmentID',appointmentTypeID);

     
   
  }


  onSubmit(): void {
    if (this.appointmentForm.valid) {
      // Handle form submission
      console.log(this.appointmentForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  selectSlot(event: Event, slotId: string): void {
    console.log('selectSlot called',slotId);
    event.preventDefault(); 
    event.stopPropagation();
  }

  calendarPopup(){
    console.log('CalendarPopup called');
    this.commonServices.openModal(CalenderModalComponent)

  }

  ConfirmAppointment2() {
    this.activeModal.close({ component: 'ConfirmAppointmentModalComponent'});
  }
}
