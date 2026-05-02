import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DepartementsService } from '../all-departements/departements.service';
import { Fondateurs } from 'src/app/core/models/fondateurs.model';
import { Hotels } from 'src/app/core/models/hotels.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.scss'],
})
export class AddDepartementComponent {
  departementForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Departement',
      items: ['Departement'],
      active: 'Add Departement',
    },
  ];
  hotels! : Hotels[];
  responsibles! : Fondateurs[];
  departementss = [ 'Francophone', 'Anglophone'];
  loading = false;
  constructor(
    private fb: UntypedFormBuilder,
    private departementsService: DepartementsService,
    private router: Router,
    public translateService : TranslateService,
    public servicesService : ServicesService
  ) {
    translateService.setDefaultLang(localStorage.getItem('lang') as string);
    this.departementForm = this.fb.group({
      name: ['', [Validators.required]],
      hotel: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lang: ['', [Validators.required]],
      responsible: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.departementForm.value);
  }

  ngOnInit(): void {
    this.getAllHotelss();
    this.getPrinciapalss();
  }

  getAllHotelss(): void {
    const paylaod = {
    }
    this.servicesService.getObjetss(
      this.servicesService.route.hotels[1],
      paylaod
    ).subscribe({
        next: (res) => {
          this.hotels = res.data;
        },
    });
  }

  getPrinciapalss(): void {
    const paylaod = {
      role_id:  3 ,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
        next: (res) => {
          this.responsibles = res.data;
        },
    });
  }

  get f() {
    return this.departementForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/admin/departements/all-departements"]
    );
  }

  addDepartements() {
    const payload = {
      name: this.f['name'].value,
      lang: this.f['lang'].value,
      description: this.f['description'].value,
      responsible_id: this.f['responsible'].value,
      hotel_id: this.f['hotel'].value
    };
    this.loading = true;
    let departementDatas = { services: [payload] };
    this.servicesService.addObjets(
      this.servicesService.route.departements[0],
      departementDatas
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
