import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PackagesService } from '../../packages.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Packages } from '../../packages.model';/* 
import { formatDate } from '@angular/common'; */

export interface DialogData {
  id: number;
  action: string;
  packages: Packages;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  packageForm: UntypedFormGroup;
  packages: Packages;
  choices = [ true, false ];
  levels = [
    'Maternelle',
    'Primaire',
    'Secondaire'
  ];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public packagesService: PackagesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.packages.name;
      this.packages = data.packages;
    } else {
      this.dialogTitle = 'New Packages';
      const blankObject = {} as Packages;
      this.packages = new Packages(blankObject);
    }
    this.packageForm = this.createContactForm();
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
      id: [this.packages.id],
      name: [this.packages.name],
      price: [this.packages.price],
      description: [this.packages.description],
      level: [this.packages.level],
      duration: [this.packages.duration],
      website: [this.packages.website],
      mail_pro: [this.packages.mail_pro],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.packagesService.addPackages(this.packageForm.getRawValue());
  }

  get f() {
    return this.packageForm.controls;
  }

  // methode de consomation de l'api de mise
  // a jour d'un packages
  updatePackages() {
    const payload = {
      name: this.f['name'].value,
      price: this.f['price'].value,
      duration: this.f['duration'].value,
      level: this.f['level'].value,
      description: this.f['description'].value,
      website: this.f['website'].value,
      mail_pro: this.f['mail_pro'].value,
    };
    console.log(payload);
    
    this.packagesService.updatePackages(
      this.packages.id,
      payload
    );
  }
}
