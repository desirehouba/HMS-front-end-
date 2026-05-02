import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { DeleteDialogComponent } from './all-transactions/dialogs/delete/delete.component';
import { AddTransactionComponent } from './all-transactions/add-transaction/add-transaction.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TransactionsService } from './all-transactions/transactions.service';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddInsolventComponent } from './add-insolvent/add-insolvent.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { AllFeesComponent } from './all-fees/all-fees.component';
import { FeesService } from './all-fees/fees.service';
import { AddStatComponent } from './add-stat/add-stat.component';
import { DeleteFeeDialogComponent } from './all-fees/delete/delete.component';
import { AboutRecuComponent } from './all-transactions/dialogs/about-recu/about-recu.component';
import { AboutFeeComponent } from './all-fees/about-fee/about-fee.component';
import { MatRadioModule } from '@angular/material/radio';
import { ArchiveComponent } from './all-transactions/dialogs/archiver/archiver.component';
import { AboutFeesComponent } from './all-fees/about-fees/about-fees.component';
import { AboutRecusComponent } from './all-transactions/dialogs/about-recus/about-recus.component';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
    AllTransactionsComponent,
    DeleteDialogComponent,
    AddTransactionComponent,
    AddInsolventComponent,
    AllFeesComponent,
    AddStatComponent,
    DeleteFeeDialogComponent,
    AboutRecuComponent,
    AboutFeeComponent,
    ArchiveComponent,
    AboutFeesComponent,
    AboutRecusComponent
  ],
  imports: [
    QRCodeModule,
    MatRadioModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    TransactionsRoutingModule,
    ComponentsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [TransactionsService, FeesService],
})
export class TransactionsModule {}
