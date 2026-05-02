import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FounderRoutingModule } from './founder-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    FounderRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class FounderModule {}
