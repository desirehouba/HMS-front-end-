import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AllSuppliersComponent } from './all-suppliers/all-suppliers.component';
import { AddSupplierComponent } from './all-suppliers/add-suppliers/add-supplier.component';
import { AllDisbursementsComponent } from './all-disbursements/all-disbursements.component';
import { AddDisbursementComponent } from './all-disbursements/add-disbursement/add-disbursement.component';
import { AllCashInsComponent } from './all-cashIns/all-cashIns.component';
import { AddCashInComponent } from './all-cashIns/add-cashIn/add-cashIn.component';

const routes: Routes = [ 
  {
    path: 'all-suppliers',
    component: AllSuppliersComponent,
  },
  {
    path: 'all-suppliers/add-suppliers',
    component: AddSupplierComponent,
  }, 
  {
    path: 'all-disbursements',
    component: AllDisbursementsComponent,
  },
  {
    path: 'all-disbursements/add-disbursement',
    component: AddDisbursementComponent,
  },
    {
      path: 'all-cashIns',
      component: AllCashInsComponent,
    },
    {
      path: 'all-cashIns/add-cashIn',
      component: AddCashInComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingsRoutingModule {}
