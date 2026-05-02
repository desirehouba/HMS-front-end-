import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutAccountComponent } from './about-account/about-account.component';
import { AboutNotificationsComponent } from './about-notifications/about-notifications.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'about-account',
    component: AboutAccountComponent,
  },
  {
    path: 'about-notifications',
    component: AboutNotificationsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
