import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ServicesService } from 'src/app/core/service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  submitted = false;
  loading = false;
  error = '';
  hide = false;
  hotels! : any[];
  image : any;
  ids: any = null;
  roles = ['Manager', 'assistant'];
  scholar_level: any;
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    public translateService : TranslateService,
    public servicesService : ServicesService,
    private router : Router,
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    super();
    this.image = environment.imageDirectoryPatchs
  }

  ngOnInit() {
    this.getAllHotelss(); 
  }

  getAllHotelss() {
    if(this.roles.indexOf(this.authService.currentUserValue.role) != -1 ){
      this.ids = this.authService.currentUserValue.id
    }
    const paylaod = {
      page_items : null,
      nbre_items : null,
      manager_id : this.ids
    }
    this.servicesService.getObjetss(
      this.servicesService.route.hotels[1],
      paylaod
    ).subscribe({
      next: (data) => {
        this.hotels = data.data;
        this.hide = true;
        if (this.hotels.length === 1 ) {
          this.onSubmit(this.hotels[0])
        } else {
          this.hide = true;
        } 
      },
      error: (error) => {
        this.hide = true;
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }

  onSubmit(payload: any){
    this.authService.currentUserValue.hotel_id= payload.id;
    this.authService.currentUserValue.hotelName= payload.name;
    this.authService.currentUserValue.scholar_level= payload.address;
    localStorage.setItem('currentUser', JSON.stringify(this.authService.currentUserValue)); 

    this.router.navigate(["/founder/dashboard/main"]);
  }
}
