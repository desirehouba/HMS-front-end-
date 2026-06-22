import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from '../core/models/role';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule),
  },
  {
    path: 'organisations',
    loadChildren: () =>
      import('./organisations/organisations.module').then(
        (m) => m.OrganisationsModule),
  },
  {
    path: 'hosting',
    loadChildren: () =>
      import('./hosting/hosting.module').then(
        (m) => m.HostingModule),
  },
  {
    path: 'accountings',
    loadChildren: () =>
      import('./accountings/accountings.module').then(
        (m) => m.AccountingsModule),
  },
  /* {
    path: 'transactions',
    canActivate: [AuthGuard],
    data: {
      role: [
        Role.Admin, Role.Founder, Role.Rector,
        Role.Staff
      ],
    },
    loadChildren: () =>
      import('./transactions/transactions.module').then(
        (m) => m.TransactionsModule),
  }, */
  {
    path: 'pop-ups',
    loadChildren: () =>
      import('./pop-up/popUps.module').then(
        (m) => m.PopUpsModule),
  },
  {
    path: 'bars',
    loadChildren: () =>
      import('./bars/bars.module').then(
        (m) => m.BarsModule),
  },
  {
    path: 'restaurants',
    loadChildren: () =>
      import('./restaurants/restaurants.module').then(
        (m) => m.RestaurantsModule),
  },
  {
    path: 'waters',
    loadChildren: () =>
      import('./waters/waters.module').then(
        (m) => m.WatersModule),
  },
  {
    path: 'stocks',
    loadChildren: () =>
      import('./stocks/stocks.module').then(
        (m) => m.StocksModule),
  },

  {
    path: 'human-resources',
    loadChildren: () =>
      import('./human-resources/human-resources.module').then(
        (m) => m.HumanResourcesModule),
  },
  {
    path: 'oms',
    loadChildren: () =>
      import('./oms/oms.module').then(
        (m) => m.OmsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FounderRoutingModule {}
