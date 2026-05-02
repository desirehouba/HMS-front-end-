import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNoteFraiComponent } from './all-notes-frais/add-noteFrais/add-noteFrais.component';
import { AllNotesFraisComponent } from './all-notes-frais/all-notesFrais.component';
import { AddHolidayComponent } from './all-holidays/add-holiday/add-holiday.component';
import { AllHolidaysComponent } from './all-holidays/all-holidays.component';
import { AddPermissionComponent } from './all-permissions/add-permission/add-permission.component';
import { AllPermissionsComponent } from './all-permissions/all-permissions.component';
import { AddSanctionComponent } from './all-sanctions/add-sanction/add-sanction.component';
import { AllSanctionsComponent } from './all-sanctions/all-sanctions.component';
import { AllWarningsComponent } from './all-warnings/all-warnings.component';
import { AddWarningComponent } from './all-warnings/add-warning/add-warning.component';
import { AllSalaryDeductionsComponent } from './all-salaryDeductions/all-salaryDeductions.component';
import { AddSalaryDeductionComponent } from './all-salaryDeductions/add-salaryDeduction/add-salaryDeduction.component';
import { AllContractsComponent } from './all-contracts/all-contracts.component';
import { AddContractComponent } from './all-contracts/add-contract/add-contract.component';
import { AddSalaryAdvanceComponent } from './all-salaryAdvances/add-salaryAdvance/add-salaryAdvance.component';
import { AllSalaryAdvancesComponent } from './all-salaryAdvances/all-salaryAdvances.component';

const routes: Routes = [
  {
    path: 'all-notes-frais',
    component: AllNotesFraisComponent,
  },
  {
    path: 'all-notes-frais/add-noteFrais',
    component: AddNoteFraiComponent,
  },
  {
    path: 'all-permissions',
    component: AllPermissionsComponent,
  },
  {
    path: 'all-permissions/add-permission',
    component: AddPermissionComponent,
  },
  {
    path: 'all-sanctions',
    component: AllSanctionsComponent,
  },
  {
    path: 'all-sanctions/add-sanction',
    component: AddSanctionComponent,
  },
  {
    path: 'all-warnings',
    component: AllWarningsComponent,
  },
  {
    path: 'all-warnings/add-warning',
    component: AddWarningComponent,
  },
  {
    path: 'all-holidays',
    component: AllHolidaysComponent,
  },
  {
    path: 'all-holidays/add-holiday',
    component: AddHolidayComponent,
  },
  {
    path: 'all-contracts',
    component: AllContractsComponent,
  },
  {
    path: 'all-contracts/add-contract',
    component: AddContractComponent,
  },
  {
    path: 'all-salaryDeductions',
    component: AllSalaryDeductionsComponent,
  },
  {
    path: 'all-salaryDeductions/add-salaryDeduction',
    component: AddSalaryDeductionComponent,
  },
  {
    path: 'all-salaryAdvances',
    component: AllSalaryAdvancesComponent,
  },
  {
    path: 'all-salaryAdvances/add-salaryAdvance',
    component: AddSalaryAdvanceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumanResourcesRoutingModule {}
