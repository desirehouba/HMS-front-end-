import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Users } from 'src/app/core/models/users.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class SupplierDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<SupplierDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    const paylaod = {
      user_ids: [this.data.id],
    }
    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.users[2],
      paylaod
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
