import { Routes } from '@angular/router';
import { ErrorPageComponent } from './core/components/error-page/error-page.component';
import { ScheduleAppointmentComponent } from './core/components/schedule-appointment/schedule-appointment.component';
import { SummaryComponent } from './core/components/summary/summary.component';

export const routes: Routes = [
  { path: 'practice',   component: ErrorPageComponent }, 
  {
    path: 'practice',
    children: [
      { path: 'carrotvisionsb', component: ScheduleAppointmentComponent },
      { path: 'summary', component: SummaryComponent },
      { path: '',  redirectTo: 'carrotvisionsb', pathMatch: 'full' }, 
    ]
  },
  { path: '',   redirectTo: 'practice', pathMatch: 'full' }, 

  { path: '**', component: ErrorPageComponent },
];