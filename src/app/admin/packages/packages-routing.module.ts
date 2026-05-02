import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPackagesComponent } from './all-packages/all-packages.component';
import { AddPackageComponent } from './add-package/add-package.component';

const routes: Routes = [
  {
    path: 'all-packages',
    component: AllPackagesComponent,
  },
  {
    path: 'add-package',
    component: AddPackageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesRoutingModule {}
