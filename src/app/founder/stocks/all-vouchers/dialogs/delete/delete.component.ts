import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Vouchers } from 'src/app/core/models/vouchers.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class VouchersDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<VouchersDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vouchers,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    const paylaod = {
      ids: [this.data.id],
    }
    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.vouchers[2],
      paylaod
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
