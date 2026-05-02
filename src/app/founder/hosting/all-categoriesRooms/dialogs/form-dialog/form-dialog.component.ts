import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { CategoriesRooms } from 'src/app/core/models/categoriesRooms.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
import { Sections } from 'src/app/core/models/sections.model';


export interface DialogData {
  id: number;
  action: string;
  categoriesRooms: CategoriesRooms;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class CategoriesRoomsDialogComponent {
  action: string;
  dialogTitle: string;
  categoriesRoomForm: UntypedFormGroup;
  categoriesRooms: CategoriesRooms;
  route = 'categoriesRooms';
  loading = false;
  sec!: any;
  sections: Sections[] = [];
  section = false
  constructor(
    public dialogRef: MatDialogRef<CategoriesRoomsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data.action;
      this.dialogTitle = data.categoriesRooms.name;
      this.categoriesRooms = data.categoriesRooms;
    this.categoriesRoomForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.categoriesRooms.id],
      name: [this.categoriesRooms.name],
      description: [this.categoriesRooms.description],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.categoriesRoomForm.controls;
  }

  updateCategoriesRooms() {
    this.loading = true;
    const payload = {
      name: this.f['name'].value,
      description: this.f['description'].value,
    };

    this.servicesService.updateObjets(
      this.servicesService.route.categoriesRooms[0],
      this.categoriesRooms.id, payload
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
