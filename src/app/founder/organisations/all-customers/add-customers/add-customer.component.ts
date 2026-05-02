import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Roles } from 'src/app/core/models/roles.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
;
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent {
  customerForm: UntypedFormGroup;
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
      title: 'Add Customer',
      items: ['Customer'],
      active: 'Add Customer',
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
    this.customerForm = this.fb.group({
      photo: [''],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cni: [''],
      address: [''],
      phone: ['', [Validators.required]],
      phone2: [''],
      nationality: [''],
      gender: ['', [Validators.required]],
      email: ['',
        [ Validators.email, Validators.minLength(5)]
      ],
      city: [''],
      country: [''],
      birthday: [''],
      ancienneté: [''],
      nui : [],
      birth_place: [],
      passport_issue_date: [],
      passport_issue_place: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.customerForm.value);
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
    return this.customerForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/organisations/all-customers"]
    );
  }

  // consommation de api de creation d'un privilige
  addCustomer() {
    // stockage des données du formulaire dans un objet
    // de type customer qui sera envoyé a api
    this.loading = true;
    let photo = new FormData();
    let image 

    // enregistrement de la photo du user 

    if (this.f['photo'].value != ''){
      image = this.f['photo'].value.name
      photo.append("photo",
        this.f['photo'].value,
        this.f['photo'].value.name
      );
      this.servicesService.addphoto(photo)
      .subscribe({
        next: (res) => { }
      });
    } else {
      image = 'user.jpg'
    }
    let birthday
    if (this.f['birthday'].value != '') {
      birthday = formatDate(this.f['birthday'].value,'YYYY-MM-dd', 'en-US')
    }
    let passport_issue_date
    if (this.f['passport_issue_date'].value != '') {
      passport_issue_date = formatDate(this.f['passport_issue_date'].value,'YYYY-MM-dd', 'en-US')
    }
    const customerData = {
      photo: image,
      lastname: this.f['lastname'].value,
      cni: this.f['cni'].value,
      firstname: this.f['firstname'].value,
      password: "000000",
      password_confirmation: "000000",
      connexion_type: "phone",
      passport_issue_place: this.f['passport_issue_place'].value,
      birth_place: this.f['birth_place'].value,
      passport_issue_date: passport_issue_date,
      city: this.f['city'].value,
      nationality: this.f['nationality'].value,
      address: this.f['address'].value,
      phone : this.f['phone'].value,
      phone2 : this.f['phone2'].value,
      email: this.f['email'].value,
      gender: this.f['gender'].value,
      birthday: birthday,
      role_id : 5,
      service_id : this.authService.currentUserValue.service_id,
      hotel_id : this.authService.currentUserValue.hotel_id,
    }; 
 
    this.servicesService.addObjets(
      this.servicesService.route.users[0], customerData
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
