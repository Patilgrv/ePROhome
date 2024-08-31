import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() {}

  callAnalytics(analytic: string, analyticsUrl: string = ''): void {
    // if (!analyticsUrl) {
    //   analyticsUrl = "https://www.googletagmanager.com/gtm.js?id=";
    // }

    // (function (w: any, d: Document, s: string, l: string, i: string) {
    //   w[l] = w[l] || [];
    //   w[l].push({
    //     'gtm.start': new Date().getTime(),
    //     event: 'gtm.js'
    //   });

    //   const f = d.getElementsByTagName(s)[0];
    //   const j = d.createElement(s);
    //   const dl = l !== 'dataLayer' ? `&l=${l}` : '';
    //   j.async = true;
    //   j.src = `${analyticsUrl}${i}${dl}`;
    //   f.parentNode?.insertBefore(j, f);
    // })(window, document, 'script', 'dataLayer', analytic);
    console.log("google analytics called");
    
  }
}
