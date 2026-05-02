import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SuppliersService } from '../../suppliers.service';
import { UntypedFormControl, Validators,
  UntypedFormGroup, UntypedFormBuilder,} from '@angular/forms';
import { Users } from 'src/app/core/models/users.model';
import { Roles } from 'src/app/core/models/roles.model'; 
import { AuthService } from 'src/app/core/service/auth.service';
;
import { environment } from 'src/environments/environment';
import { ServicesService } from 'src/app/core/service/services.service';

export interface DialogData {
  id: number;
  action: string;
  suppliers: Users;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class SupplierFormDialogComponent {
  dialogTitle: string;
  supplierForm: UntypedFormGroup;
  suppliers: Users;
  hide = true;  
  photo: any;
  image: any;
  loading = false;
  role = false
  user = false
  permissions!: any[];
  scholar_level!: any;
  constructor(
    public dialogRef: MatDialogRef<SupplierFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private suppliersService: SuppliersService,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.image = environment.imageDirectoryPatchs;
    this.dialogTitle = 'app.modi';
    this.suppliers = data.suppliers;
    this.supplierForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.suppliers.id],
      photo: [this.suppliers.photo],
      lastname: [this.suppliers.lastname],
      cni: [this.suppliers.cni],
      firstname: [this.suppliers.firstname],
      password: [''],
      country: [this.suppliers.country],
      city: [this.suppliers.city],
      nationality: [this.suppliers.nationality],
      address: [this.suppliers.address],
      phone: [this.suppliers.phone],
      email : [this.suppliers.email],
      type : [this.suppliers.type],
      birthday: [this.suppliers.birthday], 
      service_id : [this.suppliers.service],
      phone2: [this.suppliers.phone2],
      ancienneté: [this.suppliers.ancienneté],
      nui : [this.suppliers.nui],
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void { 
    this.permissions = this.authService.currentUserValue.permissions
  }

   // methode pour lister les permissions
  

  get f() {
    return this.supplierForm.controls;
  }

  // consommation de api de creation d'un privilige
  suppliersActions() {
    if (this.f['photo'].value === this.suppliers.photo){
      this.photo = this.suppliers.photo;
    } else {
      let photo = new FormData();
      photo.append("photo", this.f['photo'].value, this.f['photo'].value.name);
      this.photo = this.f['photo'].value.name;

      this.servicesService.addphoto(photo).subscribe({
        next: (res) => {}
      });
    }
    this.loading = true;
    const supplierData = {
      photo: this.photo, 
      nui: this.f['nui'].value,
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
      type: this.f['type'].value,
      gender: 'male',
      birthday: this.f['birthday'].value,
      role_id : 4,
      service_id : this.authService.currentUserValue.service_id,
      hotel_id : this.authService.currentUserValue.hotel_id,
    };
    
    this.servicesService.updateObjets(
      this.servicesService.route.users[0],
      this.suppliers.id, supplierData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
