import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllDepartementsComponent } from './all-departements/all-departements.component';
import { AddDepartementComponent } from './add-departement/add-departement.component';

const routes: Routes = [
  {
    path: 'all-departements',
    component: AllDepartementsComponent,
  },
  {
    path: 'add-departement',
    component: AddDepartementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartementsRoutingModule {}
