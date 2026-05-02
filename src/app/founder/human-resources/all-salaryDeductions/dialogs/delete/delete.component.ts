import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SalaryDeductions } from 'src/app/core/models/salaryDeductions.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class SalaryDeductionsDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<SalaryDeductionsDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalaryDeductions,
    public servicesService: ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    const payload =  {
      idWarnings : [this.data.id]
    };
    this.servicesService.deleteObjetsMulti(
      this.servicesService.route.salaries_deductions[2],
      payload
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
    });
  }
}
