import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenRoutingModule } from './splashScreen-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SplashScreenService } from './splashScreens.service';
import { HotelsComponent } from './hotels/hotels.component';/* 
import { StudentsComponent } from './students/students.component'; */
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SigninComponent,
    HotelsComponent,/* 
    StudentsComponent, */
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SplashScreenRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [SplashScreenService],
})
export class SplashScreenModule {}
