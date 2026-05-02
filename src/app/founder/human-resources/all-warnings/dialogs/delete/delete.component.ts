import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Warnings } from 'src/app/core/models/warnings.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogWarningComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Warnings,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    const payload =  {
      idWarnings : [this.data.id]
    };
    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.warnings[2],
      payload
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
