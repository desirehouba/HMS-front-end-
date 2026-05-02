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
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent {
  staffForm: UntypedFormGroup;
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
      title: 'Add Staff',
      items: ['Staff'],
      active: 'Add Staff',
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
    this.staffForm = this.fb.group({
      photo: [''],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cni: [''],
      responsable: [''],/* 
      password: ['', [Validators.required]], */
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
      role_id: ['', [Validators.required]],
      service_id: ['', [Validators.required]],
      ancienneté: [''],
      nui : [],
      cnps: [],
      birth_place: [],
      passport_issue_date: [],
    });
  }
  onSubmit() {
    console.log('Form Value', this.staffForm.value);
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
    const paylaod = { 
      hotel_id : this.authService.currentUserValue.hotel_id
    }
    this.servicesService.getObjetss(
      this.servicesService.route.departements[1], paylaod
    ).subscribe({
      next: (res) => {
        this.services = res.data;
      },
    });
  }

  get f() {
    return this.staffForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/organisations/all-staffs"]
    );
  }

  // consommation de api de creation d'un privilige
  addStaff() {
    
    this.loading = true;
    let photo = new FormData();
    let image
    // enregistrement de la photo du user 

    if (this.f['photo'].value != '' && this.f['photo'].value != undefined) {
      image = this.f['photo'].value.name;
      photo.append("photo",
        this.f['photo'].value,
        this.f['photo'].value.name
      );
      this.servicesService.addphoto(photo)
      .subscribe({
        next: (res) => { }
      });
    }
    
    let birthday
    if (this.f['birthday'].value != '') {
      birthday = formatDate(this.f['birthday'].value,'YYYY-MM-dd', 'en-US')
    }
    let passport_issue_date
    if (this.f['passport_issue_date'].value != '') {
      passport_issue_date = formatDate(this.f['passport_issue_date'].value,'YYYY-MM-dd', 'en-US')
    }
    
    const staffData = {
      photo: image,
      lastname: this.f['lastname'].value,
      cni: this.f['cni'].value,
      firstname: this.f['firstname'].value,
      password: "000000",
      password_confirmation: "000000",
      connexion_type: "phone",
      nui : this.f['nui'].value,
      cnps: this.f['cnps'].value,
      birth_place: this.f['birth_place'].value,
      passport_issue_date: passport_issue_date,
      responsible_id: this.f['responsable'].value,
      city: this.f['city'].value,
      nationality: this.f['nationality'].value,
      address: this.f['address'].value,
      phone : this.f['phone'].value,
      phone2 : this.f['phone2'].value,
      email: this.f['email'].value,
      gender: this.f['gender'].value,
      birthday: birthday,
      role_id : this.f['role_id'].value,
      service_id : this.f['service_id'].value,
      hotel_id : this.authService.currentUserValue.hotel_id,
    };
    
    
    this.servicesService.addObjets(
      this.servicesService.route.users[0], staffData
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
