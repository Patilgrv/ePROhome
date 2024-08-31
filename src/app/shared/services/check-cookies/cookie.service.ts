import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  // constructor(private el: ElementRef) {}
  constructor() {}

  checkCookie(): boolean {
    let cookieEnabled = navigator.cookieEnabled;
    
    
    if (!cookieEnabled) {
      document.cookie = "testcookie";
      cookieEnabled = document.cookie.indexOf("testcookie") !== -1;
    }

    if (!cookieEnabled) {
      this.showCookieFail();
    } else {
      const cookieMsg = document.cookie.indexOf("testcookie") === -1;
      if (!cookieMsg) {
        // this.hideElement('cookieNotPresent');
      } else {
        // this.hideElement('cookiePresent');
      }
    }

    return cookieEnabled;
  }

  // private hideElement(elementId: string): void {
  //   const element = this.el.nativeElement.querySelector(`#${elementId}`);
  //   if (element) {
  //     element.classList.add('ng-hide');
  //   }
  // }

  private showCookieFail(): void {
    // Assuming AddErrorLog is part of another service injected here
    this.addErrorLog('clientKey', 'InquiryId', "An error occurred because cookies are blocked in the client's browser.");
    // this.hideLoading();
    // this.showErrorModal();
  }

  private addErrorLog(clientKey: string, inquiryId: string, errorMessage: string): void {
    // Your error logging logic here
    console.error(`Error logged: ${errorMessage}`);
  }

  // private hideLoading(): void {
  //   const loadingElement = this.el.nativeElement.querySelector('.epro-loading');
  //   if (loadingElement) {
  //     loadingElement.style.display = 'none';
  //   }
  // }

  // private showErrorModal(): void {
  //   const errorModal = this.el.nativeElement.querySelector('#Error');
  //   if (errorModal) {
  //     errorModal.classList.add('show'); // Assuming 'show' class makes the modal visible
  //   }
  // }
}
