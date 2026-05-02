import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllFondateursComponent } from './all-fondateurs/all-fondateurs.component';
import { AddFondateurComponent } from './add-fondateur/add-fondateur.component';

const routes: Routes = [
  {
    path: 'all-fondateurs',
    component: AllFondateursComponent,
  },
  {
    path: 'add-fondateur',
    component: AddFondateurComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FondateursRoutingModule {}
