import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRolesComponent } from './all-roles/all-roles.component';
import { AddRoleComponent } from './add-role/add-role.component';

const routes: Routes = [
  {
    path: 'all-roles',
    component: AllRolesComponent,
  },
  {
    path: 'add-role',
    component: AddRoleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
