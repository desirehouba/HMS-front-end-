import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { AddNoteFraiComponent } from './all-notes-frais/add-noteFrais/add-noteFrais.component';
import { NotesFraisService } from './all-notes-frais/notesFrais.service';
import { AllNotesFraisComponent } from './all-notes-frais/all-notesFrais.component';
import { FormDialogComponent } from './all-notes-frais/dialogs/form-dialog/form-dialog.component';
import { AboutUserComponent } from './all-notes-frais/dialogs/about-user/about-user.component';
import { DeleteDialogComponent } from './all-notes-frais/dialogs/delete/delete.component';
import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { PermissionsService } from './all-permissions/permissions.service';
import { AllPermissionsComponent } from './all-permissions/all-permissions.component';
import { AddPermissionComponent } from './all-permissions/add-permission/add-permission.component';
import { AboutPermissionsComponent } from './all-permissions/dialogs/about-permissions/about-permissions.component';
import { PermissionsFormDialogComponent } from './all-permissions/dialogs/form-dialog/form-dialog.component';
import { PermissionsDeleteDialogComponent } from './all-permissions/dialogs/delete/delete.component';
import { HolidaysService } from './all-holidays/holidays.service';
import { AllHolidaysComponent } from './all-holidays/all-holidays.component';
import { AddHolidayComponent } from './all-holidays/add-holiday/add-holiday.component';
import { HolidaysFormDialogComponent } from './all-holidays/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogHolidaysComponent } from './all-holidays/dialogs/delete/delete.component';
import { AboutHolidaysComponent } from './all-holidays/dialogs/about-holidays/about-holidays.component';
import { FormDialogSanctionComponent } from './all-sanctions/dialogs/form-dialog/form-dialog.component';
import { AllSanctionsComponent } from './all-sanctions/all-sanctions.component';
import { AddSanctionComponent } from './all-sanctions/add-sanction/add-sanction.component';
import { AboutSanctionComponent } from './all-sanctions/dialogs/about-user/about-user.component';
import { DeleteDialogSanctionComponent } from './all-sanctions/dialogs/delete/delete.component';
import { SanctionsService } from './all-sanctions/sanctions.service';
import { FormDialogWarningComponent } from './all-warnings/dialogs/form-dialog/form-dialog.component';
import { AllWarningsComponent } from './all-warnings/all-warnings.component';
import { AddWarningComponent } from './all-warnings/add-warning/add-warning.component';
import { AboutWarningComponent } from './all-warnings/dialogs/about-user/about-user.component';
import { DeleteDialogWarningComponent } from './all-warnings/dialogs/delete/delete.component';
import { WarningsService } from './all-warnings/warnings.service';
import { AllSalaryDeductionsComponent } from './all-salaryDeductions/all-salaryDeductions.component';
import { AddSalaryDeductionComponent } from './all-salaryDeductions/add-salaryDeduction/add-salaryDeduction.component';
import { FormSalaryDeductionDialogComponent } from './all-salaryDeductions/dialogs/form-dialog/form-dialog.component';
import { AboutSalaryDeductionComponent } from './all-salaryDeductions/dialogs/about-salaryDeduction/about-salaryDeduction.component';
import { SalaryDeductionsDeleteDialogComponent } from './all-salaryDeductions/dialogs/delete/delete.component';
import { SalaryDeductionsService } from './all-salaryDeductions/salaryDeductions.service';
import { AllContractsComponent } from './all-contracts/all-contracts.component';
import { AddContractComponent } from './all-contracts/add-contract/add-contract.component';
import { AboutContractsComponent } from './all-contracts/dialogs/about-contracts/about-contracts.component';
import { ContractsDeleteDialogComponent } from './all-contracts/dialogs/delete/delete.component';
import { ContractsFormDialogComponent } from './all-contracts/dialogs/form-dialog/form-dialog.component';
import { ContractsService } from './all-contracts/contracts.service';
import { SalaryAdvancesService } from './all-salaryAdvances/salaryAdvances.service';
import { AllSalaryAdvancesComponent } from './all-salaryAdvances/all-salaryAdvances.component';
import { AddSalaryAdvanceComponent } from './all-salaryAdvances/add-salaryAdvance/add-salaryAdvance.component';
import { FormSalaryAdvanceDialogComponent } from './all-salaryAdvances/dialogs/form-dialog/form-dialog.component';
import { SalaryAdvancesDeleteDialogComponent } from './all-salaryAdvances/dialogs/delete/delete.component';
import { AboutSalaryAdvanceComponent } from './all-salaryAdvances/dialogs/about-salaryAdvance/about-salaryAdvance.component';
import { PayrollsService } from './all-payrolls/payrolls.service';
import { AllPayrollsComponent } from './all-payrolls/all-payrolls.component';
import { AddPayrollComponent } from './all-payrolls/add-payroll/add-payroll.component';
import { AboutPayrollComponent } from './all-payrolls/dialogs/about-user/about-user.component';
@NgModule({
  declarations: [
    AddNoteFraiComponent,
    AllNotesFraisComponent,
    FormDialogComponent,
    AboutUserComponent,
    DeleteDialogComponent,
    AllPermissionsComponent,
    AddPermissionComponent,
    AboutPermissionsComponent,
    PermissionsFormDialogComponent,
    PermissionsDeleteDialogComponent,
    AllHolidaysComponent,
    AddHolidayComponent,
    HolidaysFormDialogComponent,
    DeleteDialogHolidaysComponent,
    AboutHolidaysComponent,
    FormDialogSanctionComponent,
    AllSanctionsComponent,
    AddSanctionComponent,
    AboutSanctionComponent,
    DeleteDialogSanctionComponent,
    FormDialogWarningComponent,
    AllWarningsComponent,
    AddWarningComponent,
    AboutWarningComponent,
    DeleteDialogWarningComponent,
    AllSalaryDeductionsComponent,
    AddSalaryDeductionComponent,
    FormSalaryDeductionDialogComponent,
    AboutSalaryDeductionComponent,
    SalaryDeductionsDeleteDialogComponent,
    AllContractsComponent,
    AddContractComponent,
    AboutContractsComponent,
    ContractsDeleteDialogComponent,
    ContractsFormDialogComponent,
    AllSalaryAdvancesComponent,
    AddSalaryAdvanceComponent,
    FormSalaryAdvanceDialogComponent,
    SalaryAdvancesDeleteDialogComponent,
    AboutSalaryAdvanceComponent,
    AllPayrollsComponent,
    AddPayrollComponent,
    AboutPayrollComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    HumanResourcesRoutingModule,
    ComponentsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [NotesFraisService,PermissionsService,  PayrollsService,
    HolidaysService, SanctionsService, WarningsService,
    SalaryDeductionsService, ContractsService,SalaryAdvancesService],
})
export class HumanResourcesModule {}
