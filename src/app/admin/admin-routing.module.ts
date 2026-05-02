import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule),
  },
  {
    path: 'fondateurs',
    loadChildren: () =>
      import('./fondateurs/fondateurs.module').then(
        (m) => m.FondateursModule),
  },
  {
    path: 'privileges',
    loadChildren: () =>
      import('./privileges/privileges.module').then(
        (m) => m.PrivilegesModule),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./roles/roles.module').then(
        (m) => m.RolesModule),
  },
  {
    path: 'departements',
    loadChildren: () =>
      import('./departements/departements.module').then(
        (m) => m.DepartementsModule),
  },
  /* {
    path: 'schools',
    loadChildren: () =>
      import('./schools/schools.module').then(
        (m) => m.SchoolsModule
      ),
  }, */
  {
    path: 'packages',
    loadChildren: () =>
      import('./packages/packages.module').then(
        (m) => m.PackagesModule),
  },
  {
    path: 'hotels',
    loadChildren: () =>
      import('./hotels/hotels.module').then(
        (m) => m.HotelsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
