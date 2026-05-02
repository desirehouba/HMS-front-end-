import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { TypeInvoices } from 'src/app/core/models/typeInvoices.model';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class TypeInvoicesDeleteDialogComponent {
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<TypeInvoicesDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeInvoices,
    private servicesService : ServicesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.loading = true;
    this.servicesService.deleteObjets
      (this.servicesService.route.typeinvoices[0], this.data.id)
        .subscribe({
          next: (data) => {
            this.loading = false;
            this.dialogRef.close(1);
          },
        }
      );
  }
}
