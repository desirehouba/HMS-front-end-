import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Products } from 'src/app/core/models/products.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  products: Products;
}

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.scss'],
})
export class AboutProductComponent {
  dialogTitle: string;
  products: Products;
  image : any
  constructor(
    public dialogRef: MatDialogRef<AboutProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    // Set the defaults
    this.dialogTitle = data.products.name;
    this.products = data.products;
    this.image = environment.imageDirectoryPatchs
  }
  
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
