import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CashIns } from 'src/app/core/models/cashIns.model';

export interface DialogData {
  id: number;
  action: string;
  cashIns: CashIns;
}

@Component({
  selector: 'app-about-cashIn',
  templateUrl: './about-cashIn.component.html',
  styleUrls: ['./about-cashIn.component.scss'],
})
export class AboutCashInComponent {
  dialogTitle: string;
  cashIns: CashIns;
  constructor(
    public dialogRef: MatDialogRef<AboutCashInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.cashIns.order ? data.cashIns.order.name : (data.cashIns.booking ? data.cashIns.booking.name : '');
    this.cashIns = data.cashIns;
  }
}
