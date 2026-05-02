import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SalaryDeductions } from 'src/app/core/models/salaryDeductions.model';

export interface DialogData {
  id: number;
  action: string;
  salaryDeductions: SalaryDeductions;
}

@Component({
  selector: 'app-about-salaryDeduction',
  templateUrl: './about-salaryDeduction.component.html',
  styleUrls: ['./about-salaryDeduction.component.scss'],
})
export class AboutSalaryDeductionComponent {
  dialogTitle: string;
  salaryDeductions: SalaryDeductions;
  constructor(
    public dialogRef: MatDialogRef<AboutSalaryDeductionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.salaryDeductions.libelle;
    this.salaryDeductions = data.salaryDeductions;
  }
}
