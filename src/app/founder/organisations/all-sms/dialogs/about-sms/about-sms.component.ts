import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Sms } from 'src/app/core/models/sms.model';

export interface DialogData {
  id: number;
  action: string;
  sms: Sms;
}

@Component({
  selector: 'app-about-sms',
  templateUrl: './about-sms.component.html',
  styleUrls: ['./about-sms.component.scss'],
})
export class AboutSmsComponent {
  dialogTitle: string;
  sms: Sms;
  constructor(
    public dialogRef: MatDialogRef<AboutSmsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = 'SMS';
    this.sms = data.sms;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
