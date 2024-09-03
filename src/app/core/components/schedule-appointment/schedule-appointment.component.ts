import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { first, switchMap } from 'rxjs';
import { ConfirmAppointmentModalComponent } from '../../../modals/confirm-appointment-modal/confirm-appointment-modal.component';
import { ConfirmPersonalDetailsModalComponent } from '../../../modals/confirm-personal-details-modal/confirm-personal-details-modal.component';
import { RequestAppointmentDetailsModalComponent } from '../../../modals/request-appointment-details-modal/request-appointment-details-modal.component';
import { ConfirmAppointmentDetailsModalComponent } from '../../../modals/confirm-appointment-details-modal/confirm-appointment-details-modal.component';
import { VerifyOtpModalComponent } from '../../../modals/verify-otp-modal/verify-otp-modal.component';
import { MakePaymentModalComponent } from '../../../modals/make-payment-modal/make-payment-modal.component';
import { CardPaymentModalComponent } from '../../../modals/card-payment-modal/card-payment-modal.component';
import { AuthorizeDotNetCardPaymentModalComponent } from '../../../modals/authorize-dot-net-card-payment-modal/authorize-dot-net-card-payment-modal.component';
import { HeartlandCardPaymentModalComponent } from '../../../modals/heartland-card-payment-modal/heartland-card-payment-modal.component';
import { RequestSummaryErrorModalComponent } from '../../../modals/request-summary-error-modal/request-summary-error-modal.component';
import { SummaryRequestModalComponent } from '../../../modals/summary-request-modal/summary-request-modal.component';
import { CheckAvailabilityModalComponent } from '../../../modals/check-availablity-modal/check-availablity-modal.component';
import { GlobalValuesService } from '../../../shared/services/global/global.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { RestapiService } from '../../../shared/services/restapi/restapi.service';
import { CookieService } from '../../../shared/services/check-cookies/cookie.service';
import { UTMService } from '../../../shared/services/utm/utm.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorModalComponent } from '../../../modals/error-modal/error-modal.component';
import { ClientService } from '../../../shared/services/get-client/client.service';
import { AppConstant } from '../../../shared/constants/constants';
import { TimeSlotService } from '../../../shared/services/get-time-slotss/time-slots.service';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-appointment.component.html',
  styleUrl: './schedule-appointment.component.scss'
})
export class ScheduleAppointmentComponent {
  

  clientDom: string = ''; 
  clientDomData: any;
  accessToken: string = '';
  clientKey: string = '';
  hasUTMParams: boolean = false; 
  inquiryId: string = '';
  isCarrotVisionsbFound: boolean = false;
  useRequestForm: boolean = false;



  constructor(
    private _restApiServices: RestapiService,
     private commonServices: CommonService , 
     private cookieService : CookieService,
     private utmService: UTMService,
     private route: ActivatedRoute,
     private clientService: ClientService,
     private timeSlotService : TimeSlotService

  )
  {}

  ngOnInit(){
    
    const cookiesEnabled = this.cookieService.checkCookie();
    if (!cookiesEnabled) {
      this.openModal(ErrorModalComponent, {isCookiesEnabled : cookiesEnabled}, {
        class: 'modal-dialog modal-dialog-centered modal-xl model-schedule modal-cutsom-login modal-cutsom-modal epro-datetime-modal'
      });
    }
    
    else{
    this.checkUtmparameters();
    this.checkUrl();
    }
    // this.getAuthorize();
  }  


  getAuthorize(){
    let api = this.commonServices.apiParams(`RSACAuth`,'','');
    this._restApiServices.getData(api)
    .pipe(first()).subscribe({
      next: (res: any) => {
        console.log('response auth',res);
      }, error: error => {
        console.log('getAllLocations', error);
      }, 
    });
  }



  checkUrl() : void{
    const default_app_type = '12416'
    const default_locatiopn_type = '0'
    const date : any = new Date().toISOString().split('T')[0];
    const checkCarrotvision = this.route?.snapshot?.routeConfig?.path === 'carrotvisionsb';
    const apptTypeValue = this.route.snapshot.queryParams['appttype'] ; 
    const locTypeValue = this.route.snapshot.queryParams['loc'];
    const finalApptTypeValue = apptTypeValue || default_app_type;
    const finalLocTypeValue = locTypeValue || default_locatiopn_type; 
    const providerSrcId = '0'

      if (checkCarrotvision){
      this.clientService.getClient('carrotvisionsb')
      .pipe(
        switchMap(() => this.timeSlotService.getTimeSlots(date, finalApptTypeValue, finalLocTypeValue, providerSrcId))
      )
      .subscribe({
        next: (result: any) => {
            this.useRequestForm = result?.inquiryDetail?.validate?.useRequestForm;
            
        if (this.useRequestForm) {
            this.openModal(RequestAppointmentDetailsModalComponent, {}, {  
              class: AppConstant.class
            });
          } else if ((apptTypeValue || locTypeValue)) { 
            this.openModal(ConfirmAppointmentModalComponent , {}, {
              class: AppConstant.class
            });        
          } else {
            this.openModal(CheckAvailabilityModalComponent, {}, {  
              class: AppConstant.class
            });        
          }
        },
      });
    }
    else{
      this.openModal(ErrorModalComponent, {}, {
        class: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal'
        
      });
    }
  }
        
  

  checkUtmparameters(){
    const isUtmAvailable = this.utmService.retrieveUTMParams();
    // if (isUtmAvailable) {
    //   this.logUTMParameters();
    // }
  }


 


  async openModal(component: any, data?: any, config?: any) {
    try {
      const results = await this.commonServices.openModal(component, data, { ...config });
      switch (results.component) {
        case 'ConfirmAppointmentModalComponent':
          this.openModal(ConfirmAppointmentModalComponent, results.value, results.config );
          break;
        case 'ConfirmPersonalDetailsModalComponent':
          this.openModal(ConfirmPersonalDetailsModalComponent, results.value, results.config );
          break;
        case 'RequestAppointmentDetailsModalComponent':
          this.openModal(RequestAppointmentDetailsModalComponent, results.value, results.config );
          break;
     
        // case 'ConfirmAppointmentDetailsModalComponent':
        //   this.openModal(VerifyOtpModalComponent, results.value, results.config );
        //   break;
        // case 'VerifyOtpModalComponent':
        //   this.openModal(MakePaymentModalComponent, results.value, results.config );
        //   break;
        // case 'MakePaymentModalComponent':
        //   this.openModal(CardPaymentModalComponent, results.value, results.config );
        //   break;
        // case 'CardPaymentModalComponent':
        //   this.openModal(AuthorizeDotNetCardPaymentModalComponent, results.value, results.config );
        //   break;
        // case 'AuthorizeDotNetCardPaymentModalComponent':
        //   this.openModal(HeartlandCardPaymentModalComponent, results.value, results.config );
        //   break;
        // case 'HeartlandCardPaymentModalComponent':
        //   this.openModal(SummaryRequestModalComponent, results.value, results.config );
        //   break;
        // case 'SummaryRequestModalComponent':
        //   this.openModal(RequestSummaryErrorModalComponent, results.value, results.config );
        //   break;
        // case 'RequestSummaryErrorModalComponent':
        //   this.openModal(RequestSummaryErrorModalComponent, results.value, results.config );
        //   break;
        default:
          this.openModal(RequestSummaryErrorModalComponent, results.value, results.config );
          break;
      }
    } catch (reason) {
      console.log('Modal dismissed:', reason);
    }
  }
}


