import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { TypeRooms } from 'src/app/core/models/typeRooms.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
import { Sections } from 'src/app/core/models/sections.model';


export interface DialogData {
  id: number;
  action: string;
  typeRooms: TypeRooms;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class TypeRoomsDialogComponent {
  action: string;
  dialogTitle: string;
  typeRoomForm: UntypedFormGroup;
  typeRooms: TypeRooms;
  route = 'typeRooms';
  loading = false;
  sec!: any;
  sections: Sections[] = [];
  section = false
  constructor(
    public dialogRef: MatDialogRef<TypeRoomsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data.action;
      this.dialogTitle = data.typeRooms.name;
      this.typeRooms = data.typeRooms;
    this.typeRoomForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.typeRooms.id],
      name: [this.typeRooms.name],
      description: [this.typeRooms.description],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.typeRoomForm.controls;
  }

  updateTypeRooms() {
    this.loading = true;
    const payload = {
      name: this.f['name'].value,
      description: this.f['description'].value,
    };

    this.servicesService.updateObjets(
      this.servicesService.route.typeRooms[0],
      this.typeRooms.id, payload
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        if( error.message){
          this.servicesService.showCustomPositionEchec(error.message);
        } else {
          this.servicesService.showCustomPositionEchec(error);
        }
      },
    });
  }
}
