import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { TypeInvoices } from 'src/app/core/models/typeInvoices.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
import { Sections } from 'src/app/core/models/sections.model';


export interface DialogData {
  id: number;
  action: string;
  typeInvoices: TypeInvoices;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class TypeInvoicesDialogComponent {
  action: string;
  dialogTitle: string;
  typeInvoiceForm: UntypedFormGroup;
  typeInvoices: TypeInvoices;
  route = 'typeInvoices';
  loading = false;
  sec!: any;
  sections: Sections[] = [];
  section = false
  constructor(
    public dialogRef: MatDialogRef<TypeInvoicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data.action;
      this.dialogTitle = data.typeInvoices.name;
      this.typeInvoices = data.typeInvoices;
    this.typeInvoiceForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.typeInvoices.id],
      code: [this.typeInvoices.code],
      name: [this.typeInvoices.name],
      type: [this.typeInvoices.type],
      category: [this.typeInvoices.category], 
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {  } 

  get f() {
    return this.typeInvoiceForm.controls;
  }

  updateTypeInvoices() {
    this.loading = true;
    const payload = {
      code: this.f['code'].value,
      name: this.f['name'].value,
      type: this.f['type'].value,
      category: this.f['category'].value, 
      idSchool : this.typeInvoices.idSchool,
    };

    this.servicesService.updateObjets(
      this.servicesService.route.typeinvoices[0],
      this.typeInvoices.id, payload
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
