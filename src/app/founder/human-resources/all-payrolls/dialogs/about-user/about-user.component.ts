import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Invoices } from 'src/app/core/models/invoices.model';

export interface DialogData {
  id: number;
  action: string;
  invoices: Invoices;
}

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutPayrollComponent {
  dialogTitle: string;
  invoices: Invoices;
  constructor(
    public dialogRef: MatDialogRef<AboutPayrollComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.invoices.reasons;
    this.invoices = data.invoices;
  }
}
