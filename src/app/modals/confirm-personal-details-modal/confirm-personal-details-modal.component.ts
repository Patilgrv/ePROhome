import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestapiService } from '../../shared/services/restapi/restapi.service';
import { CommonService } from '../../shared/services/common/common.service';


@Component({
  selector: 'app-confirm-personal-details-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-personal-details-modal.component.html',
  styleUrl: './confirm-personal-details-modal.component.scss',
})
export class ConfirmPersonalDetailsModalComponent {
  Patient: any;
  appointmentDetails: any;
  hearAboutUsText: any = 'hearAboutUsText static';
  location: any;

  constructor(
    private _restApiServices: RestapiService,
    private commonServices: CommonService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    
  ) {}


  ngOnInit() {
    // this.initForm();
  }

  // initForm() {
  //   this.patientForm = this.fb.group({
  //     firstName: ['', [Validators.required, Validators.maxLength(30)]],
  //     lastName: ['', [Validators.required, Validators.maxLength(30)]],
  //     mobileNumber: ['', [Validators.required, Validators.minLength(8)]],
  //     dob: [''],
  //     email: [
  //       '',
  //       [Validators.required, Validators.email, Validators.maxLength(100)],
  //     ],
  //     zipCode: [''],
  //     gender: ['', Validators.required],
  //     isRequestedForEarlierAppointment: [false],
  //     waitDate: [''],
  //     smsOptIn: [true],
  //     HDUHAUDescription : ['', [Validators.required]],
  //     familyName : ['', [Validators.required]],
  //     dateOfBirth : ['', [Validators.required]],
  //   });
  // }




  PostConfirmAppointmentDetails(): void {
    let api = this.commonServices.apiParams(
      `ConfirmAppointmentDetails`,
      `?inquiryId=51539&clientDom=410`,
      {
        firstName: 'Jon',
        familyName: 'Doe',
        mobilePhone: '+1(201) 422-2370',
        birthdate: '04-10-2010',
        email: 'test@example.us',
        addToWaitList: true,
        waitListFromDate: '2024-08-07T00:00:00+05:30',
        waitListToDate: '2024-08-07T00:00:00+05:30',
        HDUHAU_Selected_ID: '0',
        HDUHAU_Other_Desc: '',
        gender: 'male',
        zipcode: '94043',
        smsOptIn: true,
        notes: '',
      }
    );
    this._restApiServices
      .createData(api)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.Patient = res?.inquiryDetail?.demographic;
          this.appointmentDetails = res?.inquiryDetail?.slot;
          this.location = res?.inquiryDetail?.location;
          console.log('this.Patient', this.Patient);

          console.log(res);
        },
      
      });
  }

  onSubmit() {
    this.activeModal.close({
      component: 'ConfirmPersonalDetailsModalComponent',
    });
  }



  ConfirmPersonalDetails(event: Event) : void{
    const form = document.querySelector('form');
    // if (form && form.checkValidity()) {
    //   this.activeModal.close({ component: 'ConfirmPersonalDetailsModalComponent', value: { value: 'string' }, size: 'lg' });
    //  event.preventDefault();
    // }
    if (form) {
      this.activeModal.close({ component: 'ConfirmPersonalDetailsModalComponent', value: { value: 'string' }, size: 'lg' });
    }
     else {
      console.log('Form is invalid');
    }
  }

  BackConfirmAppointment(): void {
    this.activeModal.close({ component: 'CheckAvailabilityModalComponent' });
  }

  

}




