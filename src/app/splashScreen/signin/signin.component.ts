import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TranslateService } from '@ngx-translate/core';
import { Hotels } from 'src/app/core/models/hotels.model';
import { environment } from 'src/environments/environment';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  hide = false;
  hotels! : Hotels;
  image : any;
  constructor(
    private router: Router,
    private authService: AuthService,
    public translateService: TranslateService,
    public servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    super();
    this.image = environment.imageDirectoryPatchs
  }

  ngOnInit() {
    this.getAllHotelss();
  }

  onSubmit(){
    this.authService.currentUserValue.hotel_id = this.hotels.id
    localStorage.setItem('currentUser', JSON.stringify(this.authService.currentUserValue));
    localStorage.setItem('currentHotel', JSON.stringify(this.hotels));
    this.router.navigate(["/splashScreen/hotels"]);
  }

  getAllHotelss() {
    const paylaod = {
      //idFounder : this.authService.currentUserValue.id,
    }
    this.subs.sink = this.servicesService.getObjetss(
      this.servicesService.route.hotels[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.hotels = res.data[0];
        this.hide = true;
      },
      error: (error) => {
        this.hide = true;
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
