import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HostingRoutingModule } from './hosting-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { AllCategoriesRoomsComponent } from './all-categoriesRooms/all-categoriesRooms.component';
import { CategoriesRoomsDialogComponent } from './all-categoriesRooms/dialogs/form-dialog/form-dialog.component';
import { CategoriesRoomsDeleteDialogComponent } from './all-categoriesRooms/dialogs/delete/delete.component';
import { CategoriesRoomsService } from './all-categoriesRooms/categoriesRooms.service';
import { TableModule } from 'primeng/table';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { AddRoomComponent } from './all-rooms/add-room/add-room.component';
import { RoomsService } from './all-rooms/rooms.service';
import { AddCategoriesRoomComponent } from './all-categoriesRooms/add-categoryiesRoom/add-categoriesRoom.component';
import { AllTypeRoomsComponent } from './all-typeRooms/all-typeRooms.component';
import { AddTypeRoomComponent } from './all-typeRooms/add-typeRoom/add-typeRoom.component';
import { TypeRoomsDialogComponent } from './all-typeRooms/dialogs/form-dialog/form-dialog.component';
import { TypeRoomsDeleteDialogComponent } from './all-typeRooms/dialogs/delete/delete.component';
import { TypeRoomsService } from './all-typeRooms/typeRooms.service';
import { BookingsService } from './all-bookings/bookings.service';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { AddBookingComponent } from './all-bookings/add-booking/add-booking.component';
import { AboutRoomComponent } from './all-rooms/dialogs/about-room/about-room.component';
import { FormDialogRoomComponent } from './all-rooms/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-rooms/dialogs/delete/delete.component';
import { FormBookingDialogComponent } from './all-bookings/dialogs/form-dialog/form-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OrganisationsRoutingModule } from '../organisations/organisations-routing.module';
import { AddCustomerFormDialogComponent } from './all-bookings/dialogs/add-customer/add-customer.component';
import { RoomServicesService } from './all-roomServices/roomServices.service';
import { AllRoomServicesComponent } from './all-roomServices/all-roomServices.component';
import { RoomServicesDialogComponent } from './all-roomServices/dialogs/form-dialog/form-dialog.component';
import { RoomServicesDeleteDialogComponent } from './all-roomServices/dialogs/delete/delete.component';
import { AddRoomServiceComponent } from './all-roomServices/add-roomService/add-roomService.component';
import { FeedbacksService } from './all-feedbacks/feedbacks.service';
import { AllFeedbacksComponent } from './all-feedbacks/all-feedbacks.component';
import { FeedbacksDialogComponent } from './all-feedbacks/dialogs/form-dialog/form-dialog.component';
import { FeedbacksDeleteDialogComponent } from './all-feedbacks/dialogs/delete/delete.component';
import { AddFeedbackComponent } from './all-feedbacks/add-feedback/add-feedback.component';
import { DeleteBookingsDialogComponent } from './all-bookings/dialogs/delete/delete.component';
import { AboutBookingComponent } from './all-bookings/dialogs/about-booking/about-booking.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { AboutRoomServiceComponent } from './all-roomServices/dialogs/about-roomService/about-roomService.component';
import { AboutFeedbackComponent } from './all-feedbacks/dialogs/about-feedback/about-feedback.component';
@NgModule({
  declarations: [
    AllCategoriesRoomsComponent,
    CategoriesRoomsDeleteDialogComponent,
    CategoriesRoomsDialogComponent,
    AddCategoriesRoomComponent,
    AllRoomsComponent,
    AddRoomComponent,
    AllTypeRoomsComponent,
    AddTypeRoomComponent,
    TypeRoomsDialogComponent,
    TypeRoomsDeleteDialogComponent,
    AboutRoomComponent,
    FormDialogRoomComponent,
    DeleteDialogComponent,
    AllBookingsComponent,
    AddBookingComponent,
    AboutBookingComponent,
    DeleteBookingsDialogComponent,
    FormBookingDialogComponent,
    AddCustomerFormDialogComponent,
    AllRoomServicesComponent,
    RoomServicesDialogComponent,
    RoomServicesDeleteDialogComponent,
    AboutRoomServiceComponent,
    AddRoomServiceComponent,
    AllFeedbacksComponent,
    FeedbacksDialogComponent,
    FeedbacksDeleteDialogComponent,
    AddFeedbackComponent,
    AboutFeedbackComponent
  ],
  imports: [
    OwlNativeDateTimeModule, 
    OwlDateTimeModule,
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
    OrganisationsRoutingModule,
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
    HostingRoutingModule,
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
    CategoriesRoomsService, FeedbacksService,
    TypeRoomsService, RoomServicesService,
    RoomsService, BookingsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HostingModule {}
