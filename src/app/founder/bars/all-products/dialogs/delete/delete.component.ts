import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Products } from 'src/app/core/models/products.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class ProductsDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<ProductsDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Products,
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
      this.servicesService.route.products[2],
      paylaod
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
