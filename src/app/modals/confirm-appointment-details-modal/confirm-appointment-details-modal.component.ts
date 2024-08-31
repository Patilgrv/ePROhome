import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { RestapiService } from '../../services/restapi/restapi.service';
// import { CommonService } from '../../services/common/common.service';
import { first } from 'rxjs';
import { CommonService } from '../../shared/services/common/common.service';
import { RestapiService } from '../../shared/services/restapi/restapi.service';

@Component({
  selector: 'app-confirm-appointment-details-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-appointment-details-modal.component.html',
  styleUrl: './confirm-appointment-details-modal.component.scss',
})
export class ConfirmAppointmentDetailsModalComponent {
  appointmentSlotsList: any = [];
  Patient: any;
  appointmentDetails: any;
  hearAboutUsText: any = "hearAboutUsText static";
  location: any;
  selectedlocationName = 'selectedlocationName static';
  selectedAppTypeName = 'selectedAppTypeName static';
  practitioner= 'practitioner static';
  patientGender= 'patientGender static';
  mobilePhone= 'mobilePhone static';


  constructor(
    public activeModal: NgbActiveModal,
    private _restApiServices: RestapiService,
    private commonServices: CommonService,
    public modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getTimeSlots();
  }

  getTimeSlots() {
    let api = this.commonServices.apiParams(
      `GetTimeSlots`,
      `?date=2024-08-07T12:00:00.000Z&appointmentTypeId=12416&inquiryId=51539&clientDom=410&locationSrcId=8336&ShowMaxDays=true&ProviderSrcID=0`
    );
    this._restApiServices
      .getData(api)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.appointmentSlotsList = res?.appointmentSlots;
        },
        error: (error) => {
          console.log('getAllLocations', error);
        },
      });
  }


  PostConfirmAppointmentDetails(): void {
    let api = this.commonServices.apiParams(
      `ConfirmAppointmentDetails`,
      `?inquiryId=51539&clientDom=410`,
      {
        "firstName": "Jon",
        "familyName": "Doe",
        "mobilePhone": "+1(201) 422-2370",
        "birthdate": "04-10-2010",
        "email": "test@example.us",
        "addToWaitList": true,
        "waitListFromDate": "2024-08-07T00:00:00+05:30",
        "waitListToDate": "2024-08-07T00:00:00+05:30",
        "HDUHAU_Selected_ID": "0",
        "HDUHAU_Other_Desc": "",
        "gender": "male",
        "zipcode": "94043",
        "smsOptIn": true,
        "notes": ""
      }
    );
   this._restApiServices.createData(api)
      .pipe(first()).subscribe({
        next: (res: any) => {
          this.Patient = res?.inquiryDetail?.demographic;
          this.appointmentDetails = res?.inquiryDetail?.slot;
          this.location = res?.inquiryDetail?.location;
          console.log('this.Patient', this.Patient);


      console.log(res);
        }, error: error => {
          console.log('getAllLocations', error);
        }
      })

  }

  ConfirmAppointmentDetail4(){
    this.activeModal.close('ConfirmAppointmentDetailsModalComponent');
  }
}


