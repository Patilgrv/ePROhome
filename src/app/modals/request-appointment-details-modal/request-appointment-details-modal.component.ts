import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request-appointment-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-appointment-details-modal.component.html',
  styleUrl: './request-appointment-details-modal.component.scss'
})


export class RequestAppointmentDetailsModalComponent {

  @Input() data : any 
  hearAboutUsList:any

constructor(
  public activeModal: NgbActiveModal,
  private route: ActivatedRoute,

  ){}

  BackChangeRequest(){
  // const apptTypeValue = this.route.snapshot.queryParams['appttype'] ; 
  // const locTypeValue = this.route.snapshot.queryParams['loc'];

}
  
RequestPersonalDetails(event: Event) : void {
  const form = document.querySelector('form');
  if (form && form.checkValidity()) {
    this.activeModal.close({ 
      component: 'RequestAppointmentDetailsModalComponent',
       value: { value: 'string' }, 
       config: 'modal-dialog modal-dialog-centered modal-xl modal-cutsom-modal epro-datetime-modal'
      });
   event.preventDefault();
  // event.stopPropagation();
  } else {
    console.log('Form is invalid');
  }
}	

}
 