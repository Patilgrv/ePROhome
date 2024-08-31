import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, first, of } from 'rxjs';
import { RestapiService } from '../restapi/restapi.service';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogsService {

  constructor(
    private _restApiServices: RestapiService,
    private commonServices: CommonService

  ) { }

  addErrorLog(clientKey: string, inquiryId: string, errorMessage: string): void {
    clientKey = clientKey.trim();
    inquiryId = inquiryId ? inquiryId.toString() : '';

    if (clientKey) {
      let api = this.commonServices.apiParams(`Practice/AddErrorLog/`,`?clientKey=${clientKey}&inquiryID=${inquiryId || ''}&message=${errorMessage || ''}`,'');

      this._restApiServices
      .createData(api)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          console.log(res);
        }
      });

  
    }
  }}


