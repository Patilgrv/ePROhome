import { Component } from '@angular/core';
import { ErrorModalComponent } from '../../../modals/error-modal/error-modal.component';
import { CommonService } from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  // styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

  constructor(private commonServices: CommonService){}


    ngOnInit(){
      this.openModal(ErrorModalComponent);
    }  
  

    async openModal(component: any, data?: any, config?: any) {
      try {
        const result = await this.commonServices.openModal(component, { someData: 'test' }, { Class: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal' });
        if (result) {
            this.openModal(component);
        }
      } catch (reason) {
        console.log('Modal dismissed:', reason);
      }
    }
  
}
