import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SanctionsService } from '../../sanctions.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Sanctions } from 'src/app/core/models/sanctions.model';
import { ServicesService } from 'src/app/core/service/services.service';

export interface DialogData {
  id: number;
  action: string;
  sanctions: Sanctions;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogSanctionComponent {
  dialogTitle: string;
  sanctionForm: UntypedFormGroup;
  sanctions: Sanctions;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<FormDialogSanctionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public sanctionsService: SanctionsService,
    private fb: UntypedFormBuilder,
    private servicesService: ServicesService,
    
  ) {
      this.dialogTitle = data.sanctions.type;
      this.sanctions = data.sanctions;
    this.sanctionForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.sanctions.id],
      type: [this.sanctions.type],
      reasons: [this.sanctions.reasons],
      description: [this.sanctions.description],
      student: [this.sanctions.student.name],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
  }


  ngOnInit(): void {
  }

   // methode pour lister les permission

  get f() {
    return this.sanctionForm.controls;
  }

  // consommation de api de creation d'un privilige
  updateSanctions() {
    // stockage des données du formulaire dans un objet
    // de type sanction qui sera envoyé a api
    this.loading = true;
    const sanctionData = {
      type: this.f['type'].value,
      description: this.f['description'].value,
      reasons: this.f['reasons'].value,
      idUser: this.f['student'].value,
      idSchool : this.sanctions.idSchool,
      idSection : this.sanctions.idSection,
    };
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.sanctions[0],
      this.sanctions.id, sanctionData
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
