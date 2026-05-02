import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Holidays } from 'src/app/core/models/holidays.model';

export interface DialogData {
  id: number;
  action: string;
  holidays: Holidays;
}

@Component({
  selector: 'app-about-holidays',
  templateUrl: './about-holidays.component.html',
  styleUrls: ['./about-holidays.component.scss'],
})
export class AboutHolidaysComponent {
  dialogTitle: string;
  holidays: Holidays;
  constructor(
    public dialogRef: MatDialogRef<AboutHolidaysComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.holidays.user.name;
    this.holidays = data.holidays;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
