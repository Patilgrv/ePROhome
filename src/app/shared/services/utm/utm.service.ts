import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { RestapiService } from '../restapi/restapi.service';

@Injectable({
  providedIn: 'root'
})
export class UTMService {

  utmRequest: any = {};
  isUtmAvailable : boolean = false;
  InquiryID!: number;
  
  constructor(
    private route: ActivatedRoute,
    private commonServices: CommonService,
    private _restApiServices: RestapiService,


   ) {}

  
   retrieveUTMParams(): any {
    this.route.queryParamMap.subscribe(params => {
      const normalizedParams: { [key: string]: string | null } = {};
  
      // Normalize keys to lowercase
      params.keys.forEach(key => {
        const normalizedKey = key.toLowerCase();
        normalizedParams[normalizedKey] = params.get(key);
      });
  
      this.utmRequest = {
        utm_source: normalizedParams['utm_source'],
        utm_medium: normalizedParams['utm_medium'],
        utm_campaign: normalizedParams['utm_campaign'],
        utm_term: normalizedParams['utm_term'],
        utm_content: normalizedParams['utm_content'],
        utm_creative_format: normalizedParams['utm_creative_format'],
        utm_marketing_tactic: normalizedParams['utm_marketing_tactic'],
        utm_adgroup: normalizedParams['utm_adgroup'],
        gclid: normalizedParams['gclid'],
        wbraid: normalizedParams['wbraid'],
        gbraid: normalizedParams['gbraid'],
        utm_id: normalizedParams['utm_id'],
        utm_source_platform: normalizedParams['utm_source_platform']
      };
  
      // Check if any UTM params exist
      if (Object.values(this.utmRequest).some(param => param !== null)) {
        console.log('UTM Parameters:', this.utmRequest);
        // this.logUTMParameters(this.utmRequest);
      }
    });
  }


  
    logUTMParameters(utmRequest: any) {      
      const api = this.commonServices.apiParams(`rsacUTM`, JSON.stringify(utmRequest));
      this._restApiServices.createData(api)
      .pipe().subscribe({
        next: (res: any) => {
          console.log('response auth',res);
          this.InquiryID = res.InquiryID
        }
      });
    }




    // logUTMParameters(utmRequest: any) {
    //   const urlParams = new URLSearchParams();

    //   Object.keys(utmRequest).forEach((key) => {
    //     const value = utmRequest[key];
    //     if (value !== undefined && value !== null) {
    //       urlParams.append(key, value);
    //     }
    //   });

    //   const api = this.commonServices.apiParams(
    //     `rsacUTM?${urlParams.toString()}`,
    //     '',
    //     ''
    //   );
    //   this._restApiServices
    //     .createData(api)
    //     .pipe()
    //     .subscribe({
    //       next: (res: any) => {
    //         console.log('response auth', res);
    //         this.InquiryID = res.InquiryID;
    //       },
    //     });
    // }

  // processUTMParameters(): void {
  //     const queryParams = this.route.snapshot.queryParamMap;
  //     const normalizedParams: { [key: string]: string } = {};

  //     queryParams.keys.forEach(key => {
  //       const val = queryParams.get(key);
  //       if (val) {
  //         normalizedParams[key.toLowerCase()] = val;
  //       }
  //     });

  //     const utmParameters = [
  //       'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  //       'utm_creative_format', 'utm_marketing_tactic', 'utm_adgroup', 'gclid', 'wbraid', 'gbraid',
  //       'utm_id', 'utm_source_platform'
  //     ];

  //     const utmObject: any = {
  //       RSAC_APPT_UTM_SOURCE: '',
  //       RSAC_APPT_UTM_MEDIUM: '',
  //       RSAC_APPT_UTM_CAMPAIGN: '',
  //       RSAC_APPT_UTM_TERM: '',
  //       RSAC_APPT_UTM_CONTENT: '',
  //       RSAC_APPT_UTM_CREATIVE_FORMAT: '',
  //       RSAC_APPT_UTM_MARKETING_TACTIC: '',
  //       RSAC_APPT_UTM_ADGROUP: '',
  //       RSAC_APPT_GCLID: '',
  //       RSAC_APPT_WBRAID: '',
  //       RSAC_APPT_GBRAID: '',
  //       GOOGLE_UTM_ID: '',
  //       RSAC_APPT_UTM_SOURCE_PLATFORM: ''
  //     };

  //     let hasUTMParams = false;

  //     utmParameters.forEach(param => {
  //       let value = normalizedParams[param] || '';
  //       if (value.length > 200) {
  //         value = value.substring(0, 200);
  //       }
  //       if (value) {
  //         hasUTMParams = true;
  //       }
  //       switch (param) {
  //         case 'utm_source':
  //           utmObject.RSAC_APPT_UTM_SOURCE = value;
  //           break;
  //         case 'utm_medium':
  //           utmObject.RSAC_APPT_UTM_MEDIUM = value;
  //           break;
  //         case 'utm_campaign':
  //           utmObject.RSAC_APPT_UTM_CAMPAIGN = value;
  //           break;
  //         case 'utm_term':
  //           utmObject.RSAC_APPT_UTM_TERM = value;
  //           break;
  //         case 'utm_content':
  //           utmObject.RSAC_APPT_UTM_CONTENT = value;
  //           break;
  //         case 'utm_creative_format':
  //           utmObject.RSAC_APPT_UTM_CREATIVE_FORMAT = value;
  //           break;
  //         case 'utm_marketing_tactic':
  //           utmObject.RSAC_APPT_UTM_MARKETING_TACTIC = value;
  //           break;
  //         case 'utm_adgroup':
  //           utmObject.RSAC_APPT_UTM_ADGROUP = value;
  //           break;
  //         case 'gclid':
  //           utmObject.RSAC_APPT_GCLID = value;
  //           break;
  //         case 'wbraid':
  //           utmObject.RSAC_APPT_WBRAID = value;
  //           break;
  //         case 'gbraid':
  //           utmObject.RSAC_APPT_GBRAID = value;
  //           break;
  //         case 'utm_id':
  //           utmObject.GOOGLE_UTM_ID = value;
  //           break;
  //         case 'utm_source_platform':
  //           utmObject.RSAC_APPT_UTM_SOURCE_PLATFORM = value;
  //           break;
  //       }
  //     });

  //     // You can now use `utmObject` in your component
  //     console.log('UTM Object:', utmObject);
  //     if (hasUTMParams) {
  //       // Perform further actions if necessary
  //     }

  //   } 
  
}

  