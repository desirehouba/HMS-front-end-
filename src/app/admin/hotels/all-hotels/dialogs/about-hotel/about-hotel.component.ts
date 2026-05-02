import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HotelsService } from '../../hotels.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Hotels } from 'src/app/core/models/hotels.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  hotels: Hotels;
}

@Component({
  selector: 'app-about-hotel',
  templateUrl: './about-hotel.component.html',
  styleUrls: ['./about-hotel.component.scss'],
})
export class AboutHotelComponent {
  action: string;
  dialogTitle: string;
  hotelForm: UntypedFormGroup;
  hotels: Hotels;
  image : any;
  constructor(
    public dialogRef: MatDialogRef<AboutHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public hotelsService: HotelsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.image = environment.imageDirectoryPatchs+data.hotels.logo
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.hotels.name;
      this.hotels = data.hotels;
    } else {
      this.dialogTitle = 'New Hotels';
      const blankObject = {} as Hotels;
      this.hotels = new Hotels(blankObject);
    }
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
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
