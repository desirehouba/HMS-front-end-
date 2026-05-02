import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CustomersService } from '../../customers.service';
import { UntypedFormControl, Validators,
  UntypedFormGroup, UntypedFormBuilder,} from '@angular/forms';
import { Users } from 'src/app/core/models/users.model';
import { Roles } from 'src/app/core/models/roles.model'; 
import { AuthService } from 'src/app/core/service/auth.service';
;
import { environment } from 'src/environments/environment';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  customers: Users;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class CustomerFormDialogComponent {
  dialogTitle: string;
  customerForm: UntypedFormGroup;
  customers: Users;
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
    public dialogRef: MatDialogRef<CustomerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public customersService: CustomersService,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.image = environment.imageDirectoryPatchs;
    this.dialogTitle = 'app.modi';
    this.customers = data.customers;
    this.customerForm = this.createContactForm();
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
      id: [this.customers.id],
      photo: [this.customers.photo],
      lastname: [this.customers.lastname],
      cni: [this.customers.cni],
      firstname: [this.customers.firstname],
      password: [''],
      country: [this.customers.country],
      city: [this.customers.city],
      nationality: [this.customers.nationality],
      address: [this.customers.address],
      phone: [this.customers.phone],
      email : [this.customers.email],
      gender : [this.customers.gender],
      birthday: [this.customers.birthday],
      responsable : [this.customers.responsible ? this.customers.responsible.id : ''],
      service_id : [this.customers.service ? this.customers.service.id : ''],
      phone2: [this.customers.phone2],
      ancienneté: [this.customers.ancienneté],
      nui : [this.customers.nui], 
      passport_issue_place: [this.customers.passport_issue_place], 
      birth_place: [this.customers.birth_place], 
      passport_issue_date: [this.customers.passport_issue_date], 
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
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
      role_types : ["Direction", "Customers"]
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

  // consommation de api de creation d'un privilige
  customersActions() {
    if (this.f['photo'].value === this.customers.photo){
      this.photo = this.customers.photo;
    } else {
      let photo = new FormData();
      photo.append("photo", this.f['photo'].value, this.f['photo'].value.name);
      this.photo = this.f['photo'].value.name;

      this.servicesService.addphoto(photo).subscribe({
        next: (res) => {}
      });
    }
    const birthday = this.f['birthday'].value; 
    const passport_issue_date = this.f['passport_issue_date'].value; 
    this.loading = true;
    const customerData = {
      photo: this.photo,
      lastname: this.f['lastname'].value,
      cni: this.f['cni'].value,
      firstname: this.f['firstname'].value, 
      connexion_type: "phone",
      passport_issue_place: this.f['passport_issue_place'].value, 
      birth_place: this.f['birth_place'].value, 
      city: this.f['city'].value,
      nationality: this.f['nationality'].value,
      address: this.f['address'].value,
      phone : this.f['phone'].value,
      phone2 : this.f['phone2'].value,
      email: this.f['email'].value,
      gender: this.f['gender'].value,
      birthday: birthday && birthday !== this.customers.birthday 
      ? formatDate(birthday, 'dd-MM-yyyy', 'en-US') 
      : this.customers.birthday,
      passport_issue_date: passport_issue_date && passport_issue_date !== this.customers.passport_issue_date 
      ? formatDate(passport_issue_date, 'dd-MM-yyyy', 'en-US') 
      : this.customers.passport_issue_date,
      role_id : 5,
      service_id : this.authService.currentUserValue.service_id,
      hotel_id : this.authService.currentUserValue.hotel_id,
    };
    
    this.servicesService.updateObjets(
      this.servicesService.route.users[0],
      this.customers.id, customerData
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
