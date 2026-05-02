import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HotelsService } from '../../hotels.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Packages } from 'src/app/admin/packages/all-packages/packages.model';
import { Hotels } from 'src/app/core/models/hotels.model';
import { Fondateurs } from 'src/app/core/models/fondateurs.model';
import { ServicesService } from 'src/app/core/service/services.service';

/* 
import { formatDate } from '@angular/common'; */

export interface DialogData {
  id: number;
  action: string;
  hotels: Hotels;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  dialogTitle: string;
  hotelForm: UntypedFormGroup;
  hotels: Hotels;
  fonders! : Fondateurs[];
  packages! : Packages[];
  administrative_status = [ 'Public', 'Private' ];
  religious_status = [ 'Catholic', 'Protestant', 'Secular' , 'Pentecostalism'];
  photo : any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public hotelsService: HotelsService,
    private fb: UntypedFormBuilder,
    public servicesService : ServicesService
  ) {
    this.dialogTitle = data.hotels.name;
    this.hotels = data.hotels;
    this.hotelForm = this.createContactForm();
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
      id: [this.hotels.id],
      photo: [this.hotels.logo],
      name: [this.hotels.name],
      phone: [this.hotels.phone],
      email: [this.hotels.email],
      country: [],
      website: [this.hotels.website],
      package: [],/* 
      founder: [this.hotels.founder.id], */
      code_couleur: [],
      pay_om_fees: [],
      religious_status: [],
      administrative_status: [],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getFounderss();
    this.getPackagess();
  }

  getFounderss() {
    const paylaod = {
      role_id : 2,
    }
    this.hotelsService.getFounderss(paylaod).subscribe({
      next: (res) => {
        this.fonders = res.data;
      },
    });
  }

  getPackagess() {
    this.hotelsService.getPackagess().subscribe({
      next: (res) => {
        this.packages = res.data;
      },
    });
  }

  get f() {
    return this.hotelForm.controls;
  }

  updateHotels() {
    if (this.f['photo'].value === this.hotels.logo)
    {
      this.photo = this.hotels.logo;
      console.log('test 1');
    } else {
      let photo = new FormData();
      photo.append("photo", this.f['photo'].value, this.f['photo'].value.name);
      this.photo = this.f['photo'].value.name;
      this.servicesService.addphoto(photo).subscribe({
        next: (res) => { 
          console.log(res);
        }
      });
      console.log('test 2');
    }
    const payload = {
      logo : this.photo,
      name: this.f['name'].value,
      phone: this.f['phone'].value,
      email: this.f['email'].value,
      website: this.f['website'].value,
      country: this.f['country'].value,
      idFounder: this.f['founder'].value,
      idPackage: this.f['package'].value,
      pay_om_fees: this.f['pay_om_fees'].value,
      code_couleur: this.f['code_couleur'].value,
      administrative_status: this.f['administrative_status'].value,
      religious_status: this.f['religious_status'].value,
    };
    this.hotelsService.updateHotels(
      this.hotels.id, payload
    );
  }
}
