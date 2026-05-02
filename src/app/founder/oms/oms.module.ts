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
import { OmsRoutingModule } from './oms-routing.module';
import { AllOmsComponent } from './all-oms/all-oms.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OmsService } from './all-oms/oms.service';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { AllRetraitsComponent } from './all-retraits/all-retraits.component';
import { AddRetraitComponent } from './all-retraits/add-retrait/add-retrait.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MainComponent } from './main/main.component';
import { RetraitsService } from './all-retraits/retraits.service';
import { AllFee0sComponent } from './all-fees/all-feeOs.component';
import { Fee0sService } from './all-fees/feeOs.service';
import { ValidFormDialogComponent } from './all-retraits/dialogs/form-dialog/form-dialog.component';
@NgModule({
  declarations: [
    AllOmsComponent,
    AllRetraitsComponent,
    AddRetraitComponent,
    MainComponent,
    AllFee0sComponent,
    ValidFormDialogComponent
  ],
  imports: [
    NgApexchartsModule,
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
    OmsRoutingModule,
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
  providers: [OmsService, RetraitsService, Fee0sService],
})
export class OmsModule {}
