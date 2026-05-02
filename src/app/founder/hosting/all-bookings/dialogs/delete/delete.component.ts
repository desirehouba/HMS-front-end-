import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Bookings } from 'src/app/core/models/bookings.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteBookingsDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteBookingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bookings,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    const paylaod = {
      ids: [this.data.id],
    }
    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.bookings[2],
      paylaod
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}