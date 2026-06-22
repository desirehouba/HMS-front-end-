import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Orders } from 'src/app/core/models/orders.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class OrdersDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<OrdersDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Orders,
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
      this.servicesService.route.orders[2],
      paylaod
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
