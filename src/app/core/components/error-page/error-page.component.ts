import { Component, Input } from '@angular/core';
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
      this.openModal(ErrorModalComponent, {}, {
        class: 'modal-dialog modal-dialog-centered modal-xl model-schedule modal-cutsom-login modal-cutsom-modal epro-datetime-modal'
      });
    }  
  

    async openModal(component: any, data?: any, config?: any) {


      const results = await this.commonServices.openModal(component, data, { ...config });

        // const result = await this.commonServices.openModal(component, { someData: data }, { class: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal' });
        if (results) {
            this.openModal(component);
        }
      } catch (reason : string) {
        console.log('Modal dismissed:', reason);
      }
    
  
}
