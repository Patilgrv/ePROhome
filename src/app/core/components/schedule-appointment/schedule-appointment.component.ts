import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
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
import { CheckAvailablityModalComponent } from '../../../modals/check-availablity-modal/check-availablity-modal.component';
import { GlobalValuesService } from '../../../shared/services/global/global.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { RestapiService } from '../../../shared/services/restapi/restapi.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ManifestService } from '../../../shared/services/manifest/manifest-service.service';
import { CookieService } from '../../../shared/services/check-cookies/cookie.service';
import { UTMService } from '../../../shared/services/utm/utm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorModalComponent } from '../../../modals/error-modal/error-modal.component';

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



  constructor(
    private _restApiServices: RestapiService,
     private commonServices: CommonService , 
     private globalValuesService: GlobalValuesService, 
     private sanitizer: DomSanitizer,
     private manifestService : ManifestService,
     private cookieService : CookieService,
     private utmService: UTMService,
     private route: ActivatedRoute,
     private router: Router,
  )
  {}

  ngOnInit(){
    
    const cookiesEnabled = this.cookieService.checkCookie();
    if (!cookiesEnabled) {
      console.log('Cookies are disabled or blocked.');
    };

    this.utmService.retrieveUTMParams();
     this.checkURl();

    // this.getClient();
    // this.getAuthorize();

  }  


  getValueAndMatch(url: string): string | null {
    if (!url || typeof url !== 'string') {
      return null;
    }
    
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      return hostname ? (hostname.includes('carrotvisionsb') ? hostname : null) : null;
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  }

  getAuthorize(){
    let api = this.commonServices.apiParams(`RSACAuth`,'','');
    this._restApiServices.getAuthData(api)
    .pipe(first()).subscribe({
      next: (res: any) => {
        console.log('response auth',res);
      }, error: error => {
        console.log('getAllLocations', error);
      }, 
    });
  }


  getClient(): void {
    let api = this.commonServices.apiParams(`GetClient`, `?clientDom=carrotvisionsb`);
    
    this._restApiServices.getData(api)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          if (res?.results?.status === 200) {
            this.clientDomData = res;
            this.accessToken = this.clientDomData.rsaC_LOGIN_RESPONSE.accesstoken;
            this.clientKey = this.clientDomData.rsaC_LOGIN_RESPONSE.rsaC_API_CLIENT_KEY;
  
            sessionStorage.setItem("clientDom", this.clientKey);
            this.globalValuesService.set('rsaC_API_CLIENT_KEY', this.clientKey);
  
            let title = this.clientDomData.rsaC_LOGIN_RESPONSE.pageTitle.replace("-Appointments", " | Scheduler");
            document.title = title;
            sessionStorage.setItem("Title", title);
  
            if (!document.title) {
              if (this.utmService.isUtmAvailable) {
                this.logUTMParameters();}
            } else {
              this.manifestService.getManifest(this.accessToken, this.clientKey)
                .subscribe({
                  next: (manifestData) => {
                    this.openModal(CheckAvailablityModalComponent, {}, {
                      Class: 'modal-dialog modal-dialog-centered modal-xl model-schedule modal-cutsom-login modal-cutsom-modal epro-datetime-modal'
                    });
                  }
                });
            }
          }
        }
      });
  }
  
  logUTMParameters(){
    console.log('does nothing');
  }

  checkURl() {
    const url = this.router.url;
    const queryParams = this.route.snapshot.queryParams;

    if ('appttype' in queryParams) {
      const apptTypeValue = queryParams['appttype'];
      console.log('appttype:', apptTypeValue);
      this.openModal(ConfirmAppointmentModalComponent, {}, {
        Class: 'modal-dialog modal-dialog-centered modal-xl model-schedule modal-cutsom-login modal-cutsom-modal epro-datetime-modal'
      });

      // You can store apptTypeValue in a class property if needed
    }
  
    const pathSegments = url.split('/')

    // const pathSegments = url.split('?')[0].split('/');
    this.isCarrotVisionsbFound =  pathSegments.includes('carrotvisionsb')
    const updated = url.split('?')
    console.log(updated);
    if (this.isCarrotVisionsbFound){
      this.getClient();
    }
    else{
      this.openModal(ErrorModalComponent, {}, {
        Class: 'modal-dialog modal-dialog-centered modal-xl model-schedule modal-cutsom-login modal-cutsom-modal epro-datetime-modal'
      });
    }
  }
        
  

  async openModal(component: any, data?: any, config?: any) {
    try {
      const results = await this.commonServices.openModal(component, data, { ...config });
      console.log('Modal result:', results);
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


