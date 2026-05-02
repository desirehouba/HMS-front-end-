import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { NoteFrais } from 'src/app/core/models/noteFrais.model';
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
    @Inject(MAT_DIALOG_DATA) public data: NoteFrais,
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
