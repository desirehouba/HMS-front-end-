import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StaffsService } from '../../staffs.service';
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
  staffs: Users;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class StaffFormDialogComponent {
  dialogTitle: string;
  staffForm: UntypedFormGroup;
  staffs: Users;
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
    public dialogRef: MatDialogRef<StaffFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public staffsService: StaffsService,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.image = environment.imageDirectoryPatchs;
    this.dialogTitle = 'app.modi';
    this.staffs = data.staffs;
    this.staffForm = this.createContactForm();
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
      id: [this.staffs.id],
      photo: [this.staffs.photo],
      lastname: [this.staffs.lastname],
      cni: [this.staffs.cni],
      firstname: [this.staffs.firstname],
      password: [''],
      country: [this.staffs.country],
      city: [this.staffs.city],
      nationality: [this.staffs.nationality],
      address: [this.staffs.address],
      phone: [this.staffs.phone],
      email : [this.staffs.email],
      gender : [this.staffs.gender],
      birthday: [this.staffs.birthday],
      role_id: [this.staffs.role.id],
      responsable : [this.staffs.responsible ? this.staffs.responsible.id : ''],
      service_id : [this.staffs.service ? this.staffs.service.id : ''],
      phone2: [this.staffs.phone2],
      ancienneté: [this.staffs.ancienneté],
      nui : [this.staffs.nui], 
      cnps: [this.staffs.cnps], 
      birth_place: [this.staffs.birth_place], 
      passport_issue_date: [this.staffs.passport_issue_date], 
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
    return this.staffForm.controls;
  }

  // consommation de api de creation d'un privilige
  staffsActions() {
    if (this.f['photo'].value === this.staffs.photo){
      this.photo = this.staffs.photo;
    } else {
      let photo = new FormData();
      photo.append("photo", this.f['photo'].value, this.f['photo'].value.name);
      this.photo = this.f['photo'].value.name; 
      this.servicesService.addphoto(photo).subscribe({
        next: (res) => {}
      });
    }

    let birthday  
    if (this.f['birthday'].value != '' && this.f['birthday'].value != this.staffs.birthday) {
      birthday = formatDate(this.f['birthday'].value,'YYYY-MM-dd', 'en-US')
    }else {
      birthday = this.staffs.birthday
    }
    let passport_issue_date
    if (this.f['passport_issue_date'].value != '' && this.f['passport_issue_date'].value != this.staffs.passport_issue_date) {
      passport_issue_date = formatDate(this.f['passport_issue_date'].value,'YYYY-MM-dd', 'en-US')
    }else {
      passport_issue_date = this.staffs.passport_issue_date
    }
    this.loading = true;
    const staffData = {
      photo: this.photo,
      lastname: this.f['lastname'].value,
      cni: this.f['cni'].value,
      firstname: this.f['firstname'].value, 
      connexion_type: "phone", 
      city: this.f['city'].value,
      nationality: this.f['nationality'].value,
      address: this.f['address'].value,
      phone : this.f['phone'].value,
      phone2 : this.f['phone2'].value,
      email: this.f['email'].value,
      gender: this.f['gender'].value,
      birthday: birthday,
      cnps: this.f['cnps'].value,
      birth_place: this.f['birth_place'].value, 
      passport_issue_date: passport_issue_date, 
      role_id : this.f['role_id'].value,
      service_id : this.f['service_id'].value,
      hotel_id : this.authService.currentUserValue.hotel_id,
    };
    
    this.servicesService.updateObjets(
      this.servicesService.route.users[0],
      this.staffs.id, staffData
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
