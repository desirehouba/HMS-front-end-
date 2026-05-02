import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Contracts } from 'src/app/core/models/contracts.model';

export interface DialogData {
  id: number;
  action: string;
  contracts: Contracts;
}

@Component({
  selector: 'app-about-contracts',
  templateUrl: './about-contracts.component.html',
  styleUrls: ['./about-contracts.component.scss'],
})
export class AboutContractsComponent {
  dialogTitle: string;
  contracts: Contracts;
  constructor(
    public dialogRef: MatDialogRef<AboutContractsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.contracts.user.name;
    this.contracts = data.contracts;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
