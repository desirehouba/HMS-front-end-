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
import { WatersRoutingModule } from './waters-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { TableModule } from 'primeng/table'; 
import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductsComponent } from './all-products/add-product/add-product.component';
import { ProductsDialogComponent } from './all-products/dialogs/form-dialog/form-dialog.component';
import { ProductsDeleteDialogComponent } from './all-products/dialogs/delete/delete.component'; 
import { ProductsService } from './all-products/products.service';
import { OrdersService } from './all-orders/orders.service';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AddOrderComponent } from './all-orders/add-order/add-order.component'; 
import { AboutOrderComponent } from './all-orders/dialogs/about-order/about-order.component'; 
import { ComponentsModule } from 'src/app/shared/components/components.module'; 
import { AboutProductComponent } from './all-products/dialogs/about-product/about-product.component';
import { OrdersDialogComponent } from './all-orders/dialogs/form-dialog/form-dialog.component';
import { AllProductMovementsComponent } from './all-productMovements/all-productMovements.component';
import { AddProductMovementComponent } from './all-productMovements/add-productMovement/add-productMovement.component';
import { ProductMovementsService } from './all-productMovements/productMovements.service';
@NgModule({
  declarations: [ 
    AllProductsComponent,
    AddProductsComponent,
    ProductsDialogComponent,
    AboutProductComponent,
    ProductsDeleteDialogComponent, 
    AddOrderComponent,
    AllOrdersComponent,
    AboutOrderComponent, 
    OrdersDialogComponent,
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
    WatersRoutingModule,
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
    ProductsService, 
    OrdersService, ProductMovementsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WatersModule {}
