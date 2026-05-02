import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';/* 
import { SigninComponent } from './signin/signin.component'; */
import { HotelsComponent } from './hotels/hotels.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'hotels',
    pathMatch: 'full',
  },/* 
  {
    path: 'signin',
    component: SigninComponent,
  }, */
  {
    path: 'hotels',
    component: HotelsComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
