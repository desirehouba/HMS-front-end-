import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { DirectionService } from './service/direction.service';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { ServicesService } from './service/services.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule,],
  providers: [RightSidebarService, AuthGuard, AuthService, DirectionService, ServicesService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
