import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SalaryAdvances } from 'src/app/core/models/salaryAdvances.model';

export interface DialogData {
  id: number;
  action: string;
  salaryAdvances: SalaryAdvances;
}

@Component({
  selector: 'app-about-salaryAdvance',
  templateUrl: './about-salaryAdvance.component.html',
  styleUrls: ['./about-salaryAdvance.component.scss'],
})
export class AboutSalaryAdvanceComponent {
  dialogTitle: string;
  salaryAdvances: SalaryAdvances;
  constructor(
    public dialogRef: MatDialogRef<AboutSalaryAdvanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.salaryAdvances.libelle;
    this.salaryAdvances = data.salaryAdvances;
  }
}
