import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

export interface DialogData {
  id: number;
  action: string;
  idTrans: number;
  type: number;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class ValidFormDialogComponent {
  action: any;
  message: string = 'app.message_transaction_encour';
  valider: string = 'app.validation_code';
  hide = true;
  loading = false;
  error = 'app.message_transaction_error';
  validForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<ValidFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data;
    
    this.validForm = this.createContactForm();
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
      id: [this.action.idTrans],
      code: [''],
    });
  }

  ngOnInit(): void {
    /* if (this.action === 'Web') {
      this.getStatusWeb(this.idTrans);
    } else {
      this.getStatusMobile(this.idTrans);
    } */
  }

  get f() {
    return this.validForm.controls;
  }

  getStatusMobile() {
    this.loading = true;
    const payload = {
      idwithdrawal: this.action.idTrans,
      code : this.f['code'].value,
    };

    this.servicesService.addObjets(
      this.servicesService.route.withdrawalsconfirm[0], payload
    ).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
