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
  suppliers: Users;
}

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierFormDialogComponent { 
  supplierForm: UntypedFormGroup; 
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
    public dialogRef: MatDialogRef<AddSupplierFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private authService: AuthService,  
    public translateService : TranslateService,
    private servicesService: ServicesService
    ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.supplierForm = this.fb.group({
      photo: [''],
      firstname: ['', [Validators.required]],/* 
      lastname: ['', [Validators.required]], */
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
      type: [''],
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
    return this.supplierForm.controls;
  } 
  // consommation de api de creation d'un privilige
  addSupplier() {
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
    }
    const customerData = {
      photo: image,  
      firstname: this.f['firstname'].value,
      password: "000000",
      password_confirmation: "000000",
      connexion_type: "phone",
      country: this.f['country'].value,
      city: this.f['city'].value, 
      address: this.f['address'].value,
      phone : this.f['phone'].value,
      phone2 : this.f['phone2'].value,
      email: this.f['email'].value,
      type: this.f['type'].value,
      gender: 'male', 
      role_id : 4,
      service_id : this.authService.currentUserValue.service_id,
      hotel_id : this.authService.currentUserValue.hotel_id,
    }; 
 
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
