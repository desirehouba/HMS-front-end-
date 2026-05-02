import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { RoomServices } from 'src/app/core/models/roomServices.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
import { Sections } from 'src/app/core/models/sections.model';


export interface DialogData {
  id: number;
  action: string;
  roomServices: RoomServices;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class RoomServicesDialogComponent {
  action: string;
  dialogTitle!: string;
  roomServiceForm: UntypedFormGroup;
  roomServices: RoomServices;
  route = 'roomServices';
  loading = false;
  sec!: any;
  services: any[] = [];
  section = false
  constructor(
    public dialogRef: MatDialogRef<RoomServicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data.action; 
      this.roomServices = data.roomServices;
    this.roomServiceForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.roomServices.id],
      name: [this.roomServices.name],
      description: [this.roomServices.description],
      service_id: [this.roomServices.service.id],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getServicess();
  }

  getServicess() {
    const paylaod = { 
      hotel_id : this.authService.currentUserValue.hotel_id
    }
    this.servicesService.getObjetss(
      this.servicesService.route.departements[1], paylaod
    ).subscribe({
      next: (res) => {
        this.services = res.data;
      },
    });
  }

  get f() {
    return this.roomServiceForm.controls;
  }

  updateRoomServices() {
    this.loading = true;
    const payload = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      service_id : this.f['service_id'].value,
      price: this.roomServices.price,
    };

    this.servicesService.updateObjets(
      this.servicesService.route.roomServices[0],
      this.roomServices.id, payload
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
