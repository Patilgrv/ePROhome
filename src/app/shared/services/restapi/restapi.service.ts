import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http : HttpClient) { }

  getData(apidata:any){
    return this.http.get(`${environment.apiUrl?.BaseURL}${apidata.api_name}${apidata.queryParams}`);
  }

  createData(apidata:any){
    return this.http.post(`${environment.apiUrl?.BaseURL}${apidata.api_name}${apidata.queryParams}`, apidata.data);
  }

  updateData(apidata:any){
    return this.http.patch(`${environment.apiUrl?.BaseURL}${apidata.api_name}${apidata.queryParams}`, apidata.data);
  }

  deleteData(apidata:any){
    return this.http.delete(`${environment.apiUrl?.BaseURL}${apidata.api_name}${apidata.queryParams}`);
  }

  getAuthData (apidata:any){
    return this.http.get(`${environment.apiUrl?.AuthURL}${apidata.api_name}${apidata.queryParams}`);
  }
}
