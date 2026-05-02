import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Users } from 'src/app/core/models/users.model';
import { environment } from 'src/environments/environment';
import { ServicesService } from 'src/app/core/service/services.service';

export interface DialogData {
  id: number;
  action: string;
  suppliers: Users;
}

@Component({
  selector: 'app-about-supplier',
  templateUrl: './about-supplier.component.html',
  styleUrls: ['./about-supplier.component.scss'],
})
export class AboutSupplierComponent {
  dialogTitle: string;
  suppliers: Users;
  image: any;
  role: any = {}
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<AboutSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public servicesService: ServicesService,
  ) {
    this.image = environment.imageDirectoryPatchs+data.suppliers.photo
    this.dialogTitle = data.suppliers.lastname;
    this.suppliers = data.suppliers;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void { 
  }
}
