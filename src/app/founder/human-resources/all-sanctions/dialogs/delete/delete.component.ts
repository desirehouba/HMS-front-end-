import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Sanctions } from 'src/app/core/models/sanctions.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogSanctionComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogSanctionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sanctions,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;

    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.sanctions[0],
      this.data.id
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
