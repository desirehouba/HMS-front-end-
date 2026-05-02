import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';import { SigninComponent } from './signin/signin.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http'; 
import { SharedModule } from '../shared/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HotelsComponent } from './hotels/hotels.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    SigninComponent, 
        HotelsComponent,
  ],
  imports: [CommonModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatDialogModule,
    NgScrollbarModule,
    SharedModule,
    RegistrationRoutingModule,
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
export class RegistrationModule {}
