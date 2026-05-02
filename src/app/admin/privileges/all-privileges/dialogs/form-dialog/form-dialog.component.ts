import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PrivilegesService } from '../../privileges.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Privileges } from 'src/app/core/models/privileges.model';

export interface DialogData {
  id: number;
  action: string;
  privileges: Privileges;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  privilegeForm: UntypedFormGroup;
  privileges: Privileges;
  Ressources = [
    'Privileges','Roles','Forfaits','Logements', 
    'Bailleurs','payment Types','housing Categories',
    'Cities'
  ];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public privilegesService: PrivilegesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.privileges.name;
      this.privileges = data.privileges;
    } else {
      this.dialogTitle = 'New Privileges';
      const blankObject = {} as Privileges;
      this.privileges = new Privileges(blankObject);
    }
    this.privilegeForm = this.createContactForm();
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
      id: [this.privileges.id],
      name: [this.privileges.name],
      ressource: [this.privileges.ressource],
      description: [this.privileges.description]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.privilegesService.addPrivileges(this.privilegeForm.getRawValue());
  }

  get f() {
    return this.privilegeForm.controls;
  }

  // methode de consomation de l'api de mise
  // a jour d'un privilege
  updatePrivilege() {
    const payload = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      ressource: this.f['ressource'].value,
    };

    this.privilegesService.updatePrivileges(
      this.privileges.id,
      payload
    );
  }
}
