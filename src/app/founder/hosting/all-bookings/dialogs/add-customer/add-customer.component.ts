import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core'; 
import { UntypedFormControl, Validators,
  UntypedFormGroup, UntypedFormBuilder,} from '@angular/forms';
import { Users } from 'src/app/core/models/users.model'; 
import { AuthService } from 'src/app/core/service/auth.service';
;
import { ServicesService } from 'src/app/core/service/services.service';
import { TranslateService } from '@ngx-translate/core';

export interface DialogData {
  id: number;
  action: string;
  customers: Users;
}

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerFormDialogComponent { 
  customerForm: UntypedFormGroup; 
  hide = true;
  roles: any[] = [];
  users: any[] = [];
  services: any[] = [];
  photo: any;
  image: any;
  loading = false;
  role = false
  user = false
  permissions!: any[];
  scholar_level!: any;
  constructor(
    public dialogRef: MatDialogRef<AddCustomerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private authService: AuthService,  
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
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


  get f() {
    return this.customerForm.controls;
  } 
  // consommation de api de creation d'un privilige
  addCustomer() {
    // stockage des données du formulaire dans un objet
    // de type customer qui sera envoyé a api
    const customerData = {
      //photo: this.f['photo'].value.name,
      lastname: this.f['lastname'].value,
      cni: this.f['cni'].value,
      firstname: this.f['firstname'].value,
      password: "000000",
      password_confirmation: "000000",
      connexion_type: "phone",/* 
      country: this.f['country'].value, */
      city: this.f['city'].value,
      nationality: this.f['nationality'].value,
      address: this.f['address'].value,
      phone : this.f['phone'].value,
      phone2 : this.f['phone2'].value,
      email: this.f['email'].value,
      gender: this.f['gender'].value,
      birthday: this.f['birthday'].value,
      role_id : 5,
      /* service_id : this.f['service_id'].value,
      hotel_id : this.authService.currentUserValue.hotel_id, */
    };
    this.loading = true;
    let photo = new FormData();

    // enregistrement de la photo du user 

    if (this.f['photo'].value != ''){
      photo.append("photo",
        this.f['photo'].value,
        this.f['photo'].value.name
      );
      this.servicesService.addphoto(photo)
      .subscribe({
        next: (res) => { }
      });
    }
    
    this.servicesService.addObjets(
      this.servicesService.route.users[0], customerData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }
}
