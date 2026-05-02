import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FondateursService } from '../all-fondateurs/fondateurs.service';
import { Roles } from 'src/app/core/models/roles.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-add-fondateur',
  templateUrl: './add-fondateur.component.html',
  styleUrls: ['./add-fondateur.component.scss'],
})
export class AddFondateurComponent {
  fondateurForm: UntypedFormGroup;
  roles: Roles[] = [];
  sexe = [ 'male', 'female' ];
  connexion_types = [ 'email', 'phone' ];
  files!: any;
  loading = false;
  hide = true;

  breadscrums = [
    {
      title: 'Add Fondateur',
      items: ['Fondateur'],
      active: 'Add Fondateur',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    public translateService : TranslateService,
    public servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.fondateurForm = this.fb.group({
      photo: [''],
      firstname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      phone2: [''],
      password: ['', [Validators.required]],
      address: [''],
      connexion_type: [''],
      nationality: [''],
      gender: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      city: [''],
      country: [''],
      birthday: [''],
      lastname: [''],
      nui: [''],
      role_id: ['', [Validators.required]],
      cni: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.fondateurForm.value);
  }

  ngOnInit(): void {
    this.getRoless();
  }

  getRoless() {
    const paylaod = {
      filter_value: '',
      page_items: 1,
      nbre_items: 1
    }
    this.servicesService.getRoless(paylaod
    ).subscribe({
      next: (res) => {
        this.roles = res.data;
      },
    });
  }

  get f() {
    return this.fondateurForm.controls;
  }

  cancel() {
    this.router.navigate([
      "/admin/fondateurs/all-fondateurs"
    ]);
  }

  // consommation de api de creation d'un privilige
  addFondateur() {
    // stockage des données du formulaire dans un objet
    // de type fondateur qui sera envoyé a api
    /* let photo = new FormData();
    if( this.f['profile_picture'].value != ''){
      photo.append("photo",
        this.f['profile_picture'].value,
        this.f['profile_picture'].value.name);
      this.servicesService.addphoto(photo).subscribe({
        next: (res) => { this.loading = false; }
      });
    } */
    const fondateurData = {
      //profile_picture: this.f['profile_picture'].value.name,
      firstname: this.f['firstname'].value,
      lastname: this.f['lastname'].value,
      password: this.f['password'].value,
      password_confirmation: this.f['password'].value,
      nationality: this.f['nationality'].value,
      address: this.f['address'].value,
      phone : this.f['phone'].value,
      phone2 : this.f['phone2'].value,
      email: this.f['email'].value,
      gender: this.f['gender'].value,
      role_id: this.f['role_id'].value,
      nui: this.f['nui'].value,
      connexion_type: 'email',
    };
    this.loading = true
    this.servicesService.addObjets(
      this.servicesService.route.users[0], fondateurData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
        this.cancel();
      },
      error: (error) => {
        this.loading = false; 
        if( error.message) {
         this.servicesService.showCustomPositionEchec(error.message);
        } else {
         this.servicesService.showCustomPositionEchec(error);
        }
      }, 
    }); 
  }
}
