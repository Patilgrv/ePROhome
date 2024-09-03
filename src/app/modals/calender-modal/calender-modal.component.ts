import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-calender-modal',
  standalone: true,
  imports: [],
  templateUrl: './calender-modal.component.html',
  styleUrl: './calender-modal.component.scss'
})
export class CalenderModalComponent implements OnInit , AfterViewInit  {
  minDate!: string;

  constructor(public activeModal: NgbActiveModal){
  }


  ngOnInit(): void {
    setTimeout(() => {
      const datePickerInput = document.getElementById('datepicker');
      if (datePickerInput) {
        datePickerInput.click();
      }
    }, 0);
  }


  ngAfterViewInit() {
    $('#datepicker').datepicker({
      format: "yyyy-mm-dd",
      todayHighlight: true,
      language: "en",
      changeMonth: true,
      ClassName: "active-day-theme",
      startDate: new Date()
    }).on('changeDate', (e: any) => {
      this.onDateChange(e.date);
    });

  }

  onDateChange(selectedDate: Date) {
    console.log('Date selected:', selectedDate);
    this.activeModal.close(selectedDate);
  }

  closeModal() {
    this.activeModal.close(null);
  }

}

