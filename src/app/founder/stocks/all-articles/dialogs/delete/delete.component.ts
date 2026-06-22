import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Articles } from 'src/app/core/models/articles.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class ArticleDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<ArticleDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Articles,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    const payload = {
      ids: [this.data.id],
    };

    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.articles[2],
      payload
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
 }