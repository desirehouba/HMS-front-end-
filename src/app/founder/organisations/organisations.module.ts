import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AllStaffsComponent } from './all-staffs/all-staffs.component';
import { StaffDeleteDialogComponent } from './all-staffs/dialogs/delete/delete.component';
import { StaffFormDialogComponent } from './all-staffs/dialogs/form-dialog/form-dialog.component';
import { AboutStaffComponent } from './all-staffs/dialogs/about-staff/about-staff.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { StaffsService } from './all-staffs/staffs.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { AddStaffComponent } from './all-staffs/add-staff/add-staff.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatRadioModule } from '@angular/material/radio';
import { OrganisationsRoutingModule } from './organisations-routing.module';
import { CustomerDeleteDialogComponent } from './all-customers/dialogs/delete/delete.component';
import { CustomerFormDialogComponent } from './all-customers/dialogs/form-dialog/form-dialog.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { AddCustomerComponent } from './all-customers/add-customers/add-customer.component';
import { AboutCustomerComponent } from './all-customers/dialogs/about-customer/about-customer.component';
import { CustomersService } from './all-customers/customers.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AddTaskComponent } from './all-tasks/add-task/add-task.component';
import { AboutTasksComponent } from './all-tasks/dialogs/about-tasks/about-tasks.component';
import { TasksDeleteDialogComponent } from './all-tasks/dialogs/delete/delete.component';
import { TasksFormDialogComponent } from './all-tasks/dialogs/form-dialog/form-dialog.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { AddEventComponent } from './all-events/add-event/add-event.component';
import { EventFormDialogComponent } from './all-events/dialogs/form-dialog/form-dialog.component';
import { EventDeleteDialogComponent } from './all-events/dialogs/delete/delete.component';
import { AboutEventComponent } from './all-events/dialogs/about-event/about-event.component';
import { TasksService } from './all-tasks/tasks.service';
import { EventsService } from './all-events/events.service';  
import { SmsService } from './all-sms/sms.service';
import { AllSmsComponent } from './all-sms/all-sms.component';
import { AddSmsComponent } from './all-sms/add-sms/add-sms.component';
import { AboutSmsComponent } from './all-sms/dialogs/about-sms/about-sms.component';


@NgModule({
  declarations: [
    AllStaffsComponent,
    StaffDeleteDialogComponent,
    StaffFormDialogComponent,
    AboutStaffComponent,
    AddStaffComponent,
    AllCustomersComponent,
    CustomerDeleteDialogComponent,
    CustomerFormDialogComponent,
    AddCustomerComponent,
    AboutCustomerComponent,
    AllTasksComponent,
    TasksDeleteDialogComponent,
    TasksFormDialogComponent,
    AddTaskComponent,
    AboutTasksComponent,
    AllEventsComponent,
    EventDeleteDialogComponent,
    EventFormDialogComponent,
    AddEventComponent,
    AboutEventComponent,
    AllSmsComponent,
    AddSmsComponent,
    AboutSmsComponent
    
  ],
  imports: [
    MatExpansionModule,
    MatStepperModule,
    MatRadioModule,
    ComponentsModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    OrganisationsRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [StaffsService, CustomersService,   SmsService, TasksService, EventsService 
  ],
})
export class OrganisationsModule {}
