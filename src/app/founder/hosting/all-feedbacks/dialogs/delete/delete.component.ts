import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Feedbacks } from 'src/app/core/models/feedbacks.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class FeedbacksDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<FeedbacksDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedbacks,
    private servicesService : ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    this.servicesService.deleteObjets
      (this.servicesService.route.feedbacks[0], this.data.id)
        .subscribe({
          next: (data) => {
            this.loading = false;
            this.dialogRef.close(1);
          },
        }
      );
  }
}
