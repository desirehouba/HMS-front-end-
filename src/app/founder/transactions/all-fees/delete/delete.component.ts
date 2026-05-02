import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FeesService } from '../fees.service'; 
import { Transactions } from 'src/app/core/models/transactions.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteFeeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteFeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transactions,
    public feesService: FeesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.feesService.deleteFeeUsers(this.data.id);
  }
}
