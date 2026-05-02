import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Tasks } from 'src/app/core/models/tasks.mode';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class TasksDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<TasksDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tasks,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;

    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.tasks[0],
      this.data.id
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
