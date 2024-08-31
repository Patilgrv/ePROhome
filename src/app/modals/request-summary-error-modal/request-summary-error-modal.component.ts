import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-request-summary-error-modal',
  standalone: true,
  imports: [],
  templateUrl: './request-summary-error-modal.component.html',
  styleUrl: './request-summary-error-modal.component.scss'
})
export class RequestSummaryErrorModalComponent {

  

  constructor(public activeModal: NgbActiveModal){}

  ngOnInit (){
    this.activeModal.close('RequestSummaryErrorModalComponent');
  }
  
  nextScreen(){
    this.activeModal.close('RequestSummaryErrorModalComponent');
  }
}

