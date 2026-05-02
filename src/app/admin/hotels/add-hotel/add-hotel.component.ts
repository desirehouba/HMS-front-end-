import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Packages } from '../../packages/all-packages/packages.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Fondateurs } from 'src/app/core/models/fondateurs.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss'],
})
export class AddHotelComponent {
  hotelForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Hotel',
      items: ['Hotel'],
      active: 'Add Hotel',
    },
  ];
  fonders! : Fondateurs[];
  packages! : Packages[];
  loading = false;
  user = false;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    public translateService : TranslateService,
    public servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.hotelForm = this.fb.group({
      photo: [''],
      name: [''],
      phone: [''],
      email: [''],
      country: [''],
      website: [''],
      package_id: ['',],
      founder_id: [''],
      rib: ['',],
      niu: ['',],
      city: ['',],
      code_couleur: ['',],
      pay_om_fees: ['',],
      assistant_id: [''],
      manager_id: [''],
      type: [''],
      creation_date: [''],
      address: [''],
      stars: [''],
      rc: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.hotelForm.value);
  }

  ngOnInit(): void {
    this.getFounderss();
    this.getPackagess();
  }

  getFounderss() {
    const paylaod = {
      role_id : 2,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.fonders = res.data;
        this.user = false;
      },
    });
  }

  getPackagess() {
    const paylaod = {  }
    this.servicesService.getObjetss(
      this.servicesService.route.packages[1], paylaod
    ).subscribe({
      next: (res) => {
        this.packages = res.data;
      },
    });
  }

  get f() {
    return this.hotelForm.controls;
  }

  cancel() {
    this.router.navigate([
      "/admin/hotels/all-hotels"
    ]);
  }

  addHotels() {
    this.loading = true;
    let photo = new FormData();
    /* if( this.f['photo'].value != ''){
      photo.append("photo",
        this.f['photo'].value,
        this.f['photo'].value.name);
      this.servicesService.addphoto(photo)
      .subscribe({
        next: (res) => { 
          this.loading = false; 
        }, });
    } */
    const payload = {
      //logo: this.f['photo'].value.name,
      name: this.f['name'].value,
      code_couleur: this.f['code_couleur'].value,
      phone: this.f['phone'].value,
      description : "test",
      email: this.f['email'].value,
      //website: this.f['website'].value,
      country: this.f['country'].value,
      founder_id: this.f['founder_id'].value,
      package_id: this.f['package_id'].value,
      city: this.f['city'].value,
      address: this.f['address'].value,
      stars: this.f['stars'].value,
      niu: this.f['niu'].value,
      rib: this.f['address'].value,
      rc: this.f['rc'].value,
      creation_date: formatDate(this.f['creation_date'].value,'YYYY-MM-dd', 'en-US'),
      assistant_id: this.f['assistant_id'].value,
      manager_id: this.f['founder_id'].value,
      type: "test",
      category: "test",

    };
    //this.servicesService.addphoto(photo ).subscribe({ next: (res) => { } });
    this.servicesService.addObjets(
      this.servicesService.route.hotels[0], payload
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.cancel();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
    
  }
}
