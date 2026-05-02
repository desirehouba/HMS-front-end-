import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './signin/signin.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { RightSidebarComponent } from '../layout/right-sidebar/right-sidebar.component';
import { AuthLayoutComponent } from '../layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '../layout/app-layout/main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    SigninComponent,
    HeaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    NgScrollbarModule,
    SharedModule,
    AuthenticationRoutingModule,
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class AuthenticationModule {}
