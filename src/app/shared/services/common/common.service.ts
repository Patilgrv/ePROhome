import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private modalService: NgbModal) { }


  apiParams(apiname: any, queryParams?: any, data?: any) {
    let apidata: {
      api_name: any;
      queryParams?: any;
      data?: any;
    } = {
      api_name: apiname,
    };
    data ? apidata.data = data : ''
    apidata.queryParams = queryParams;
    return apidata;
  }


  openModal(component: any, data?: any, config?: any): Promise<any> {
    const defaultConfig = {
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: '',
    };

    const modalConfig = {
       ...defaultConfig,
       ...config,
       modalDialogClass: `${defaultConfig.modalDialogClass} ${config?.class || ''}`.trim()
      };

    const modalRef = this.modalService.open(component, modalConfig);
    modalRef.componentInstance.data = data || {}; 

    return modalRef.result; 
    }
}


