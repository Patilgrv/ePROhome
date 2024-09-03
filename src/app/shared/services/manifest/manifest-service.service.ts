
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../common/common.service';
import { RestapiService } from '../restapi/restapi.service';
import { ErrorLogsService } from '../error-logs/error-logs.service';
import { ThemebuilderService } from '../../helpers/themebuilder.service';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  manifestData: any;
  themeColor: string = '';
  themeLightColor: string = '';
  analyticsId: string = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private commonServices: CommonService , 
    private _restApiServices: RestapiService,
    private errorLogService : ErrorLogsService,
    private themeService : ThemebuilderService
  ) {}


  
  
    getManifest(accessToken: string, clientDom: string): Observable<boolean> {
    let api = this.commonServices.apiParams(`GetManifest`,`?clientDom=${clientDom}`);
    return new Observable((subscriber) => {  this._restApiServices.getData(api)
    .pipe(first()).subscribe({
      next: (res: any) => {
        if (res?.results?.status === true) {
          this.manifestData = res;
          this.processManifestData(clientDom);
          subscriber.next(this.manifestData)
        } else {
          this.logAndHandleError("An error occurred while retrieving the manifest details (RSACSchedulerManifest).");
          subscriber.next(true)
        }
    }});
  })
}

   

  private processManifestData(clientDom: string): void {
    if (this.manifestData.rsaC_SCHEDULER_BRANDING.rsaC_CLIENT_CUSTOMIZE_THEME_C1) {
      this.themeColor = this.manifestData.rsaC_SCHEDULER_BRANDING.rsaC_CLIENT_CUSTOMIZE_THEME_C1;
      sessionStorage.setItem("ThemeColor", this.themeColor);
      this.themeLightColor = this.LightenDarkenColor(this.themeColor, 140);
      this.analyticsId = this.manifestData.rsaC_SCHEDULER_BRANDING.rsaC_CLIENT_SETTINGS_SCHEDULER_GTMID;

      const analyticsScriptUrl = this.manifestData.rsaC_SCHEDULER_BRANDING.rsaC_CLIENT_SETTINGS_SCHEDULER_GTM_SCRIPT_SRC?.split('=')[0] + "=" || '';
      const analyticsBodyUrl = this.manifestData.rsaC_SCHEDULER_BRANDING.rsaC_CLIENT_SETTINGS_SCHEDULER_GTM_SCRIPT_BODY_SRC || '';
      
      if (this.analyticsId) {
        this.initializeAnalytics(this.analyticsId, analyticsScriptUrl, analyticsBodyUrl);
      }

      sessionStorage.setItem("Analytics", this.analyticsId);
      sessionStorage.setItem("analyticsBodyUrl", analyticsBodyUrl);
      sessionStorage.setItem("analyticsScriptUrl", analyticsScriptUrl);

      // this.applyThemeStyles();
      this.themeService.setThemeColors(this.themeColor,this.themeLightColor );
    }

    if (this.manifestData.rsaC_SCHEDULER_BRANDING_LOGOS.length > 0) {
      const logoSrc = this.manifestData.rsaC_SCHEDULER_BRANDING_LOGOS[0].src;
      // document.querySelectorAll('.epro-logo, .epro-logo-dark').forEach((el: HTMLElement) => {
      //   el.setAttribute('src', logoSrc);
      // });
      sessionStorage.setItem('logoSrc', logoSrc);
    }

    this.getLocationsApptTypes("noToken", clientDom);
  }

  private initializeAnalytics(analyticsId: string, analyticsScriptUrl: string, analyticsBodyUrl: string): void {
    const analyticsElement = this.callAnalytics(analyticsId, analyticsScriptUrl);
    document.head.appendChild(analyticsElement);

    const noscriptElement = document.createElement('noscript');
    const iframeCode = analyticsBodyUrl 
      ? `<iframe src="${analyticsBodyUrl}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` 
      : `<iframe src="https://www.googletagmanager.com/ns.html?id=${analyticsId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    
    noscriptElement.innerHTML = iframeCode;
    document.body.insertBefore(noscriptElement, document.body.firstChild);
  }

  private applyThemeStyles(): void {
    document.querySelectorAll('.btn-theme').forEach(el => el.setAttribute('style', `background-color: ${this.themeColor}`));
    document.querySelectorAll('.font-theme').forEach(el => el.setAttribute('style', `color: ${this.themeColor}`));
    
    this.appendStyleToElement('#message', `::placeholder { color: ${this.themeColor}; }`);
    this.appendStyleToElement('.epro-app-type', `background-color: ${this.themeColor};`);
    this.appendStyleToElement('.btn-theme-light', `background-color: ${this.themeLightColor};`);
    this.appendStyleToElement('#ConfirmPersonalDetails', `.form-control::placeholder { color: ${this.themeColor}; } .form-control { color: ${this.themeColor}; }`);
    this.appendStyleToElement('#ConfirmAppointmentDetails', `.form-check-input:checked { background-color: ${this.themeColor}; }`);
    this.appendStyleToElement('#ConfirmAppointment', `.card-header { background-color: ${this.themeLightColor}; } .slots:hover { background-color: ${this.themeLightColor}; } .ep-slot-body::-webkit-scrollbar { background-color: ${this.themeColor}; } .ep-slot-body::-webkit-scrollbar-thumb { background-color: ${this.themeColor}; }`);
  }

  private appendStyleToElement(selector: string, styles: string): void {
    const element = document.querySelector(selector);
    if (element) {
      const styleElement = document.createElement('style');
      styleElement.innerText = styles;
      element.appendChild(styleElement);
    }
  }

  private getLocationsApptTypes(noToken: string, clientDom: string): void {
    // Implement GetLocationsApptTypes logic here
  }

  private LightenDarkenColor(color: string, amount: number): string {
    // Implement your LightenDarkenColor function logic
    return color;
  }

  private callAnalytics(analyticsId: string, analyticsScriptUrl: string): HTMLElement {
    // Implement your callAnalytics logic
    const scriptElement = document.createElement('script');
    // Configure script element as needed
    return scriptElement;
  }

  private showLoading(show: boolean): void {
    const loadingElement = document.querySelector('.epro-loading') as HTMLElement;
    if (loadingElement) {
      loadingElement.style.display = show ? 'block' : 'none';
    }
  }

  private logAndHandleError(errorMessage: string): void {
    // this.errorLogService.addErrorLog(this.clientKey, this.inquiryId, errorMessage);
    console.log(errorMessage);
    this.showModalError();
    this.showLoading(false);
  }

  private showModalError(): void {
    const modalElement = document.querySelector('#Error') as HTMLElement;
    if (modalElement) {
      modalElement.style.display = 'block'; 
    }
  }
}
