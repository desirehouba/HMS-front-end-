import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { AddTransactionComponent } from './all-transactions/add-transaction/add-transaction.component';
import { AddInsolventComponent } from './add-insolvent/add-insolvent.component';
import { AllFeesComponent } from './all-fees/all-fees.component';
import { AddStatComponent } from './add-stat/add-stat.component';

const routes: Routes = [
  {
    path: 'all-transactions',
    component: AllTransactionsComponent,
  },
  {
    path: 'all-fees',
    component: AllFeesComponent,
  },
  {
    path: 'all-transactions/add-transaction',
    component: AddTransactionComponent,
  },
  {
    path: 'add-insolvent',
    component: AddInsolventComponent,
  },
  {
    path: 'add-stat',
    component: AddStatComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
