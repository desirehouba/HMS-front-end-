import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { Holidays } from 'src/app/core/models/holidays.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogHolidaysComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogHolidaysComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Holidays,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.notefrais[4],
      [this.data.id]
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
