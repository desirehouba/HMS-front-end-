import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllStaffsComponent } from './all-staffs/all-staffs.component';
import { AddStaffComponent } from './all-staffs/add-staff/add-staff.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { AddCustomerComponent } from './all-customers/add-customers/add-customer.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AddTaskComponent } from './all-tasks/add-task/add-task.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { AddEventComponent } from './all-events/add-event/add-event.component';
import { AllSmsComponent } from './all-sms/all-sms.component';
import { AddSmsComponent } from './all-sms/add-sms/add-sms.component';

const routes: Routes = [
  // staff
  {
    path: 'all-staffs',
    component: AllStaffsComponent,
  },
  {
    path: 'all-staffs/add-staff',
    component: AddStaffComponent,
  },
  // customers
  {
    path: 'all-customers',
    component: AllCustomersComponent,
  },
  {
    path: 'all-customers/add-customers',
    component: AddCustomerComponent,
  },
  // tasks 
  {
    path: 'all-tasks',
    component: AllTasksComponent,
  },
  {
    path: 'all-tasks/add-task',
    component: AddTaskComponent,
  },
  // events
  {
    path: 'all-events',
    component: AllEventsComponent,
  },
  {
    path: 'all-events/add-event',
    component: AddEventComponent,
  },
  // sms
  {
    path: 'all-sms',
    component: AllSmsComponent,
  },
  {
    path: 'all-sms/add-sms',
    component: AddSmsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisationsRoutingModule {}
