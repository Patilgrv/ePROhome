import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalValuesService } from '../global/global.service';
import { ManifestService } from '../manifest/manifest-service.service';
import { UTMService } from '../utm/utm.service';
import { RestapiService } from '../restapi/restapi.service';
import { CommonService } from '../common/common.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class ClientService {

queryParamsForUtm : any

  constructor(
    private http: HttpClient,
    private restApiService: RestapiService,
    private globalValuesService: GlobalValuesService,
    private utmService: UTMService,
    private manifestService: ManifestService,
    private commonServices: CommonService,
    private route: ActivatedRoute,


  ) {}

  getClient(carrotvisionsb: string): Observable<any> {
    const api = this.commonServices.apiParams(`GetClient`, `?clientDom=${carrotvisionsb}`);

    return this.restApiService.getData(api).pipe(
      map((response: any) => {
        if (response.results.status === 200) {
          const clientDomData = response;
          const accessToken = clientDomData.rsaC_LOGIN_RESPONSE.accesstoken;
          const clientKey =
            clientDomData.rsaC_LOGIN_RESPONSE.rsaC_API_CLIENT_KEY;

          sessionStorage.setItem('clientDom', clientKey);
          this.globalValuesService.set('rsaC_API_CLIENT_KEY', clientKey);

          const title = clientDomData.rsaC_LOGIN_RESPONSE.pageTitle.replace(
            '-Appointments',
            ' | Scheduler'
          );
          document.title = title;
          sessionStorage.setItem('Title', title);


          return this.manifestService.getManifest(accessToken, clientKey).pipe(
            map((manifestData: any) => ({
              ...clientDomData,
              manifestData,
            }))
          ).subscribe(()=>{
          });
        }
        return null;
      })
    );
  }

    
}
