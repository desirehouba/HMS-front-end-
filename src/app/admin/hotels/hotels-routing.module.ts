import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';

const routes: Routes = [
  {
    path: 'all-hotels',
    component: AllHotelsComponent,
  },
  {
    path: 'add-hotel',
    component: AddHotelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelsRoutingModule {}
