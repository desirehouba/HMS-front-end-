import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllOmsComponent } from './all-oms/all-oms.component';
import { AllRetraitsComponent } from './all-retraits/all-retraits.component';
import { AddRetraitComponent } from './all-retraits/add-retrait/add-retrait.component';
import { MainComponent } from './main/main.component';
import { AllFee0sComponent } from './all-fees/all-feeOs.component';

const routes: Routes = [
  {
    path: 'all-oms',
    component: AllOmsComponent,
  },
  {
    path: 'all-retraits',
    component: AllRetraitsComponent,
  },
  {
    path: 'all-retraits/add-retrait',
    component: AddRetraitComponent,
  },
  {
    path: 'all-feeOs',
    component: AllFee0sComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OmsRoutingModule {}
