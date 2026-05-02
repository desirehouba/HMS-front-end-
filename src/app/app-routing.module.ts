import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { Role } from './core/models/role';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: {
          role: [Role.Admin],
        },
        loadChildren: () =>
          import('./admin/admin.module').then(
            (m) => m.AdminModule),
      },
      {
        path: 'founder',
        canActivate: [AuthGuard],
        data: {
          role_type: [Role.founder, Role.staffs,
          Role.direction],
        },
        loadChildren: () =>
          import('./founder/founder.module').then(
            (m) => m.FounderModule),
      },
      /* {
        path: 'staff',
        canActivate: [AuthGuard],
        data: {
          role:[
            Role.Staff,
            Role.Censor,
            Role.SG,
            Role.Secretary,
            Role.Bursar,
            Role.StudyPrefect,
            Role.General_accountant,
            Role.Accountant
          ],
        },
        loadChildren: () =>
          import('./staff/staff.module').then(
            (m) => m.StaffModule),
      },

      {
        path: 'teacher',
        canActivate: [AuthGuard],
        data: {
          role: [Role.Teacher],
        },
        loadChildren: () =>
          import('./teacher/teacher.module').then(
            (m) => m.TeacherModule),
      },
 */
      /* {
        path: 'student',
        canActivate: [AuthGuard],
        data: {
          role: [Role.Parent, Role.Inscription],
        },
        loadChildren: () =>
          import('./student/student.module').then(
            (m) => m.StudentModule),
      }, */

      {
        path: 'account',
        canActivate: [AuthGuard],
        data: {
          role:[
            Role.Staff, Role.Admin,
            Role.Censor, Role.SG,
            Role.Secretary, Role.Bursar,
            Role.StudyPrefect, Role.Parent,
            Role.Student, Role.Founder,
            Role.Rector, Role.Principale,
            Role.Teacher, Role.Inscription,
            Role.General_accountant,
            Role.Accountant, Role.Assistant
          ],
        },
        loadChildren: () =>
          import('./account/account.module').then(
            (m) => m.AccountModule),
      },
    ],
  },
  
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'registration',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  
  {
    path: 'splashScreen',
    canActivate: [AuthGuard],
    data: {
      role: [
        Role.Founder, Role.Rector,
        Role.Principale, Role.Parent,
        Role.General_accountant, Role.Assistant
      ],
    },
    loadChildren: () =>
      import('./splashScreen/splashScreen.module').then(
        (m) => m.SplashScreenModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
