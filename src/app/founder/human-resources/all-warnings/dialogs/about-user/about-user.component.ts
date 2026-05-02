import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Warnings } from 'src/app/core/models/warnings.model';

export interface DialogData {
  id: number;
  action: string;
  warnings: Warnings;
}

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutWarningComponent {
  dialogTitle: string;
  warnings: Warnings;
  constructor(
    public dialogRef: MatDialogRef<AboutWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.warnings.name;
    this.warnings = data.warnings;
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
