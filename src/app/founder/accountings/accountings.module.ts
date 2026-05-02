import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AccountingsRoutingModule } from './accountings-routing.module';
import { createTranslateLoader } from 'src/app/app.module';
import { TableModule } from 'primeng/table';  
import { AllSuppliersComponent } from './all-suppliers/all-suppliers.component';
import { AddSupplierComponent } from './all-suppliers/add-suppliers/add-supplier.component';
import { SuppliersService } from './all-suppliers/suppliers.service';
import { SupplierDeleteDialogComponent } from './all-suppliers/dialogs/delete/delete.component';
import { SupplierFormDialogComponent } from './all-suppliers/dialogs/form-dialog/form-dialog.component';
import { AboutSupplierComponent } from './all-suppliers/dialogs/about-supplier/about-supplier.component';
import { AddDisbursementComponent } from './all-disbursements/add-disbursement/add-disbursement.component';
import { AllDisbursementsComponent } from './all-disbursements/all-disbursements.component';
import { AboutDisbursementComponent } from './all-disbursements/dialogs/about-disbursement/about-disbursement.component';
import { DisbursementsService } from './all-disbursements/disbursements.service';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ExpenseTypesComponent } from './all-disbursements/dialogs/expense-types/expense-types.component';
import { CashInsService } from './all-cashIns/cashIns.service';
import { AddCashInComponent } from './all-cashIns/add-cashIn/add-cashIn.component';
import { AllCashInsComponent } from './all-cashIns/all-cashIns.component';
import { AboutCashInComponent } from './all-cashIns/dialogs/about-cashIn/about-cashIn.component';
@NgModule({
  declarations: [  
    AllSuppliersComponent ,
    AddSupplierComponent, 
    SupplierDeleteDialogComponent,
    SupplierFormDialogComponent,
    AboutSupplierComponent,
    AddDisbursementComponent,
    AllDisbursementsComponent,
    AboutDisbursementComponent,
    ExpenseTypesComponent,
    AddCashInComponent,
    AllCashInsComponent,
    AboutCashInComponent
  ],
  imports: [
    ComponentsModule,
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
    AccountingsRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [ SuppliersService,DisbursementsService,  CashInsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountingsModule {}
