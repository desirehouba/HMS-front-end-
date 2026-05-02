import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'; 
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
;
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent {
  supplierForm: UntypedFormGroup;
  roles: any[] = [];
  users: any[] = [];
  services: any[] = [];
  hide = true;
  loading = false;
  files: any;
  role = false
  user = false
  permissions!: any []
  breadscrums = [
    {
      title: 'Add Supplier',
      items: ['Supplier'],
      active: 'Add Supplier',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router : Router,
    public translateService : TranslateService,
    private servicesService: ServicesService
    ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.supplierForm = this.fb.group({
      photo: [''],
      firstname: ['', [Validators.required]],
      type: ['', [Validators.required]],
      cni: [''],
      address: [''],
      phone: ['', [Validators.required]],
      phone2: [''],
      nationality: [''], 
      email: ['',
        [Validators.minLength(5)]
      ],
      city: [''],
      country: [''],
      birthday: [''],
      ancienneté: [''],
      nui : [],
    });
  }
  onSubmit() {
    console.log('Form Value', this.supplierForm.value);
  }

  ngOnInit(): void {
    this.getRoless();
    this.getUserss();
    this.getServicess();
    this.permissions = this.authService.currentUserValue.permissions
  }

   // methode pour lister les permissions
  getRoless() {
    this.role = true
    const paylaod = {
      type : "Direction"
    }
    this.servicesService.getObjetss(
      this.servicesService.route.roles[1], paylaod
    ).subscribe({
      next: (res) => {
        this.role = false
        this.roles = res.data;
      },
    });
  }

  getRolessDirection() {
    const paylaod = {  }
    this.servicesService.getObjetss(
      this.servicesService.route.roles[1], paylaod
    ).subscribe({
      next: (res) => {
        for (let item of res.data) {
          this.roles.push(item)
        }
      }
    });
  }

  getUserss() {
    this.user = true
    const paylaod = {
      role_types : ["Direction", "Staffs"]
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.users = res.data;
        this.user = false
      },
    });
  }

  getServicess() {
    const paylaod = { }
    this.servicesService.getObjetss(
      this.servicesService.route.departements[1], paylaod
    ).subscribe({
      next: (res) => {
        this.services = res.data;
      },
    });
  }

  get f() {
    return this.supplierForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/accountings/all-suppliers"]
    );
  }

  // consommation de api de creation d'un privilige
  addSupplier() {
    // stockage des données du formulaire dans un objet
    // de type supplier qui sera envoyé a api
    this.loading = true;
    let photo = new FormData();
    let image 

    // enregistrement de la photo du user 

    if (this.f['photo'].value != '' && this.f['photo'].value != undefined){
      image = this.f['photo'].value.name
      photo.append("photo",
        this.f['photo'].value,
        this.f['photo'].value.name
      );
      this.servicesService.addphoto(photo)
      .subscribe({
        next: (res) => { }
      });
    }
    const supplierData = {
      photo: image, 
      type: this.f['type'].value,
      firstname: this.f['firstname'].value,
      password: "000000",
      password_confirmation: "000000",
      connexion_type: "phone",
      country: this.f['country'].value,
      city: this.f['city'].value,
      nationality: this.f['nationality'].value,
      address: this.f['address'].value,
      phone : this.f['phone'].value,
      phone2 : this.f['phone2'].value,
      email: this.f['email'].value,
      gender: 'male',
      birthday: this.f['birthday'].value,
      role_id : 4,
      service_id : this.authService.currentUserValue.service_id,
      hotel_id : this.authService.currentUserValue.hotel_id,
    }; 
 
    this.servicesService.addObjets(
      this.servicesService.route.users[0], supplierData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
        this.cancel();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }
}
