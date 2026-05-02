import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StocksRoutingModule } from './stocks-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { TableModule } from 'primeng/table';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { ArticlesService } from './all-articles/articles.service';
import { AddArticleComponent } from './all-articles/add-article/add-article.component';
import { ArticleFormDialogComponent } from './all-articles/dialogs/form-dialog/form-dialog.component';
import { ArticleDeleteDialogComponent } from './all-articles/dialogs/delete/delete.component';
import { AboutArticleComponent } from './all-articles/dialogs/about-article/about-article.component'; 
import { ArticleMovementsService } from './all-articleMovements/articleMovements.service'; 
import { AllArticleMovementsComponent } from './all-articleMovements/all-articleMovements.component';
import { VouchersService } from './all-vouchers/vouchers.service';
import { AddVouchersComponent } from './all-vouchers/add-voucher/add-voucher.component';
import { AllVouchersComponent } from './all-vouchers/all-vouchers.component';
import { VouchersDialogComponent } from './all-vouchers/dialogs/form-dialog/form-dialog.component';
import { VouchersDeleteDialogComponent } from './all-vouchers/dialogs/delete/delete.component';
import { VouchersAboutVoucherComponent } from './all-vouchers/dialogs/about-voucher/about-voucher.component'; 
import { SupplyDemandsService } from './all-supplyDemands/supplyDemands.service';
import { AllSupplyDemandsComponent } from './all-supplyDemands/all-supplyDemands.component';
import { AboutSupplyDemandComponent } from './all-supplyDemands/dialogs/about-supplyDemand/about-supplyDemand.component';
import { AddSupplyDemandComponent } from './all-supplyDemands/add-supplyDemand/add-supplyDemand.component';
import { ComponentsModule } from 'src/app/shared/components/components.module'; 
import { SupplyDemandsDialogComponent } from './all-supplyDemands/dialogs/form-dialog/form-dialog.component';
import { ProductMovementsService } from './all-productMovements/productMovements.service';
import { AllProductMovementsComponent } from './all-productMovements/all-productMovements.component';
import { AddProductMovementComponent } from './all-productMovements/add-productMovement/add-productMovement.component';
@NgModule({
  declarations: [
    AllArticlesComponent,
    AddArticleComponent,
    ArticleFormDialogComponent,
    ArticleDeleteDialogComponent,
    AboutArticleComponent,
    AllArticleMovementsComponent,
    AddVouchersComponent,
    AllVouchersComponent,
    VouchersDialogComponent,
    VouchersDeleteDialogComponent,
    VouchersAboutVoucherComponent,
    AllSupplyDemandsComponent,
    AboutSupplyDemandComponent,
    AddSupplyDemandComponent,  
    SupplyDemandsDialogComponent,
    AllProductMovementsComponent,
    AddProductMovementComponent

  ],
  imports: [ 
    ComponentsModule, 
    TableModule,
    OwlDateTimeModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    OwlDateTimeModule,
    MatCheckboxModule,
    MatTabsModule,
    OwlNativeDateTimeModule,
    MatProgressSpinnerModule,
    StocksRoutingModule,
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
    ArticlesService, ProductMovementsService,  ArticleMovementsService,  
    VouchersService , SupplyDemandsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StocksModule {}
