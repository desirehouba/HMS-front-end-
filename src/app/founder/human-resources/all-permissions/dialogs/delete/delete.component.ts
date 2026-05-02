import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Permissions } from 'src/app/core/models/permissions.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class PermissionsDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<PermissionsDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Permissions,
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
      this.servicesService.route.permissions[2],
      payload
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
