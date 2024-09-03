import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UTMService {

  utmParams: any = {};
  isUtmAvailable : boolean = false;
  
  constructor(
    private route: ActivatedRoute,
   ) {}

  
  retrieveUTMParams(): any {
    this.route.queryParamMap.subscribe(params => {
      this.utmParams = {
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_term: params.get('utm_term'),
        utm_content: params.get('utm_content'),
        utm_creative_format: params.get('utm_creative_format'),
        utm_marketing_tactic: params.get('utm_marketing_tactic'),
        utm_adgroup: params.get('utm_adgroup'),
        gclid: params.get('gclid'),
        wbraid: params.get('wbraid'),
        gbraid: params.get('gbraid'),
        utm_id: params.get('utm_id'),
        utm_source_platform: params.get('utm_source_platform')
      };

      // You can check if any UTM params exist
      if (Object.values(this.utmParams).some(param => param !== null)) {
        console.log('UTM Parameters:', this.utmParams)
        return this.isUtmAvailable = true; 
      } else {
        return this.isUtmAvailable = false;
        ;
      }
    });
  }
}
