import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RoomServices } from 'src/app/core/models/roomServices.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class RoomServicesDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<RoomServicesDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomServices,
    private servicesService : ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    this.servicesService.deleteObjets
      (this.servicesService.route.roomServices[0], this.data.id)
        .subscribe({
          next: (data) => {
            this.loading = false;
            this.dialogRef.close(1);
          },
        }
      );
  }
}
