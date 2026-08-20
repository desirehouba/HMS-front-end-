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
  fonder = false
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
      photo: [this.hotels.logo],
      name: [this.hotels.name],
      phone: [this.hotels.phone],
      email: [''],
      country: [''],
      website: [''],
      package_id: ['',],
      founder_id: [''],
      rib: ['',],
      niu: ['',],
      city: ['',],
      code_couleur: ['',],
      pay_om_fees: ['',],
      assistant_id: [''],
      manager_id: [this.hotels?.manager?.id],
      type: [''],
      creation_date: [''],
      address: [''],
      stars: [''],
      rc: [''],
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
      role_types : ["Direction", "Staffs"]
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.fonders = res.data;
        this.fonder = false
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
       name: this.f['name'].value,
      code_couleur: this.f['code_couleur'].value,
      phone: this.f['phone'].value,
      description : "test",
      email: this.f['email'].value,
      //website: this.f['website'].value,
      country: this.f['country'].value,
      founder_id: this.f['founder_id'].value,
      package_id: this.f['package_id'].value,
      city: this.f['city'].value,
      address: this.f['address'].value,
      stars: this.f['stars'].value,
      niu: this.f['niu'].value,
      rib: this.f['address'].value,
      rc: this.f['rc'].value, 
      assistant_id: this.f['assistant_id'].value,
      manager_id: this.f['founder_id'].value,
      type: "test",
      category: "test",
    };
    this.hotelsService.updateHotels(
      this.hotels.id, payload
    );
  }
}
