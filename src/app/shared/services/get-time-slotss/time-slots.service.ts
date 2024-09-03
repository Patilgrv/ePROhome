import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalValuesService } from '../global/global.service';
import { CommonService } from '../common/common.service';
import { RestapiService } from '../restapi/restapi.service';


@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
  constructor(
    private globalValuesService: GlobalValuesService,
    private commonServices: CommonService,
    private _restApiServices: RestapiService
  ) {}

  getTimeSlots(date: Date, appointmentTypeId: string, locationId: string, providerSrcId : string): Observable<boolean> {
    const inquiryId = "54535";  //add check if not present null l
    const showMaxDays = true;

    const apiUrl = this.commonServices.apiParams(
      `RSACSearchSLOTV2`,
      `?date=${date}&AppointmentTypeSrcID=${appointmentTypeId}&InquiryID=${inquiryId}&LocationSRCID=${locationId}&ShowMaxDays=${showMaxDays}&ProviderSrcID=${providerSrcId}`
    );
    return this._restApiServices.getData(apiUrl).pipe(map((res: any) => res));
  }


 

}
