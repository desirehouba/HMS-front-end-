import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Contracts } from 'src/app/core/models/contracts.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class ContractsDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<ContractsDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contracts,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    
    const payload =  {
      ids : [this.data.id]
    };
    console.log(payload);
    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.contracts[4],
      payload
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
