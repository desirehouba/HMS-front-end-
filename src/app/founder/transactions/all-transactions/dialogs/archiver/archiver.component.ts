import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl, Validators,
  UntypedFormGroup, UntypedFormBuilder,
} from '@angular/forms';
import { ServicesService } from 'src/app/core/service/services.service';
import { PensionUsers } from 'src/app/core/models/pensionsUsers.model';

export interface DialogData {
  id: number;
  transaction: PensionUsers;
}

@Component({
  selector: 'app-archiver',
  templateUrl: './archiver.component.html',
  styleUrls: ['./archiver.component.scss'],
})
export class ArchiveComponent {
  dialogTitle: string;
  ratingForm: UntypedFormGroup;
  transaction: PensionUsers;
  scholar_level!: String;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<ArchiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.dialogTitle = "app.archiver_transaction";
    this.transaction = data.transaction;
    this.ratingForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.transaction.id],
      student: [this.transaction.student.name],
      classe: [this.transaction.student.classe.name],
      amount: [this.transaction.advancePayment],
      date: [this.transaction.created_at],
      payment_mode : [this.transaction.payment_mode],
      reason: ['', [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}


  get f() {
    return this.ratingForm.controls;
  }

  // consommation de api de creation d'un rating
  updateRatings() {
    // stockage des données du formulaire dans un objet
    // de type rating qui sera envoyé a api
    this.loading = true;
    const ratingData = {
      archive: 'archive',
      reason: this.f['reason'].value,
      idPensionUser : this.transaction.id,
    };
    
    this.servicesService.archiverObjets(
      this.servicesService.route.pensionUsersArchive[0], ratingData
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
