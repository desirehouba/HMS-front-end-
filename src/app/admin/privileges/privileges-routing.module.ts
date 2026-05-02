import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPrivilegesComponent } from './all-privileges/all-privileges.component';
import { AddPrivilegeComponent } from './add-privilege/add-privilege.component';

const routes: Routes = [
  {
    path: 'all-privileges',
    component: AllPrivilegesComponent,
  },
  {
    path: 'add-privilege',
    component: AddPrivilegeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivilegesRoutingModule {}
