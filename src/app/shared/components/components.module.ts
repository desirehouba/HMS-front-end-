import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
//import { SharedModule } from '../shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    //SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [FileUploadComponent],
})

export class ComponentsModule {}
