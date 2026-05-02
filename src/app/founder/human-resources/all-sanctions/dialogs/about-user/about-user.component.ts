import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Sanctions } from 'src/app/core/models/sanctions.model';

export interface DialogData {
  id: number;
  action: string;
  sanctions: Sanctions;
}

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutSanctionComponent {
  dialogTitle: string;
  sanctions: Sanctions;
  constructor(
    public dialogRef: MatDialogRef<AboutSanctionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.sanctions.type;
    this.sanctions = data.sanctions;
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
