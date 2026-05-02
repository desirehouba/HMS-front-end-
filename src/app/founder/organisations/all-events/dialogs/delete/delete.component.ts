import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Events } from 'src/app/core/models/events.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class EventDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<EventDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Events,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    const paylaod = {
      event_ids: [this.data.id],
    }
    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.events[2],
      paylaod
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}