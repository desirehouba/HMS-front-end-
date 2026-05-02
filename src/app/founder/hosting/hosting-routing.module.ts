import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCategoriesRoomsComponent } from './all-categoriesRooms/all-categoriesRooms.component';
import { AddCategoriesRoomComponent } from './all-categoriesRooms/add-categoryiesRoom/add-categoriesRoom.component';
import { AddTypeRoomComponent } from './all-typeRooms/add-typeRoom/add-typeRoom.component';
import { AllTypeRoomsComponent } from './all-typeRooms/all-typeRooms.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { AddRoomComponent } from './all-rooms/add-room/add-room.component';
import { AddBookingComponent } from './all-bookings/add-booking/add-booking.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { AllRoomServicesComponent } from './all-roomServices/all-roomServices.component';
import { AddRoomServiceComponent } from './all-roomServices/add-roomService/add-roomService.component';
import { AllFeedbacksComponent } from './all-feedbacks/all-feedbacks.component';
import { AddFeedbackComponent } from './all-feedbacks/add-feedback/add-feedback.component';

const routes: Routes = [
  {
    path: 'all-rooms/all-categoriesRooms',
    component: AllCategoriesRoomsComponent,
  },
  {
    path: 'all-rooms/all-categoriesRooms/add-categoriesRoom',
    component: AddCategoriesRoomComponent,
  },
  {
    path: 'all-rooms/all-typeRooms',
    component: AllTypeRoomsComponent,
  },
  {
    path: 'all-rooms/all-typeRooms/add-typeRoom',
    component: AddTypeRoomComponent,
  },
  {
    path: 'all-rooms',
    component: AllRoomsComponent,
  },
  {
    path: 'all-rooms/add-room',
    component: AddRoomComponent,
  },
  {
    path: 'all-bookings',
    component: AllBookingsComponent,
  },
  {
    path: 'all-bookings/add-booking',
    component: AddBookingComponent,
  },
  {
    path: 'all-roomServices',
    component: AllRoomServicesComponent,
  },
  {
    path: 'all-roomServices/add-roomService',
    component: AddRoomServiceComponent,
  },
  {
    path: 'all-feedbacks',
    component: AllFeedbacksComponent,
  },
  {
    path: 'all-feedbacks/add-feedback',
    component: AddFeedbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostingRoutingModule {}
