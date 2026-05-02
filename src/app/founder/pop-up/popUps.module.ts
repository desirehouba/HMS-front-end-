import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PopUpsRoutingModule } from './popUps-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { TableModule } from 'primeng/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddCustomerFormDialogComponent } from './add-customer/add-customer.component';
import { AddArticleFormDialogComponent } from './add-article/add-article.component';
import { AddSupplierFormDialogComponent } from './add-supplier/add-supplier.component';
import { AddOrderFormDialogComponent } from './add-order/add-order.component';
@NgModule({
  declarations: [
    AddCustomerFormDialogComponent,
    AddArticleFormDialogComponent,
    AddSupplierFormDialogComponent,
    AddOrderFormDialogComponent
  ],
  imports: [
    MatDatepickerModule,
    MatExpansionModule,
    MatStepperModule,
    MatRadioModule,
    ComponentsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    TableModule,
    SharedModule,
    TableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    PopUpsRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopUpsModule {}
