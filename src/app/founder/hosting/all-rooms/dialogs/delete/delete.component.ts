import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Rooms } from 'src/app/core/models/rooms.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rooms,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    const payload = {
      ids: [this.data.id],
    };

    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.rooms[2],
      payload
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
