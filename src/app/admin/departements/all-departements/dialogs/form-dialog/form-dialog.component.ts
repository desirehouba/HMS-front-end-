import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DepartementsService } from '../../departements.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Fondateurs } from 'src/app/core/models/fondateurs.model';
import { Departements } from 'src/app/core/models/departements.model';
import { Hotels } from 'src/app/core/models/hotels.model';

/* 
import { formatDate } from '@angular/common'; */

export interface DialogData {
  id: number;
  action: string;
  departements: Departements;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  dialogTitle: string;
  departementForm: UntypedFormGroup;
  departements: Departements;
  hotels! : Hotels[];
  principals! : Fondateurs[];/* 
  departementss = [ 'Francophone', 'Anglophone', 'Bilingue' ]; */
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public departementsService: DepartementsService,
    private fb: UntypedFormBuilder
  ) {
    this.dialogTitle = data.departements.name;
    this.departements = data.departements;
    this.departementForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.departements.id],
      name: [this.departements.name],
      hotel: [this.departements.hotel.id],
      lang: [this.departements.lang],
      principal: [],
      description: [this.departements.description]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getAllHotelss();
    this.getPrinciapalss();
  }

  getAllHotelss(): void {
    const paylaod = {
      hotel_id : 1,
    }
    this.departementsService.getAllHotelss(paylaod).subscribe({
      next: (res) => {
        this.hotels = res.data;
        console.log(res.data);
        
      },
    });
  }

  getPrinciapalss(): void {
    const paylaod = {
      role_id : 3,
    }
    this.departementsService.getPrinciapalss(paylaod).subscribe({
      next: (res) => {
        this.principals = res.data;
        console.log(res.data);
        
      },
    });
  }

  get f() {
    return this.departementForm.controls;
  }

  updateDepartements() {
    const payload = {
      name: this.f['name'].value,
      lang: this.f['lang'].value,
      description: this.f['description'].value,
      idPrincipal: this.f['principal'].value,
      hotel_id: this.f['hotel'].value
    };
    console.log(payload);
    
    this.departementsService.updateDepartements(
      this.departements.id,
      payload
    );
  }
}
