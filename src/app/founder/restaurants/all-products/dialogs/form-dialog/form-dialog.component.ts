import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductsService } from '../../products.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms'; 
import { AuthService } from 'src/app/core/service/auth.service';
;
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
import { Articles } from 'src/app/core/models/articles.model';
import { Products } from '../../../../../core/models/products.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  products: Products;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class ProductsDialogComponent {
  action: string;
  dialogTitle: string;
  productForm: UntypedFormGroup;
  products: Products; 
  loading = false 
  articles: Articles[] = [];
  responsibles: any[] = [];
  suppliers: any[] = []; 
  productArrys: any[] = [];
  responsables: any[] = [];
  users: any[] = []; 
  numbersProducts = [1,2,3,4,5,6,7,8,9,10]
  productData: any;
  hide = false; 
  responsable = false;
  supplier = false;
  user = false;
  image!:any
  article = false; 
  constructor(
    public dialogRef: MatDialogRef<ProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public productsService: ProductsService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    public servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data.action; 
        this.image = environment.imageDirectoryPatchs;
      this.dialogTitle = data.products.name;
      this.products = data.products; 
    this.productForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.products.id],
      name: [this.products.name],  
      nbrProduct: [this.products.articles.length],
      description: [this.products.description], 
      status: [this.products.status], 
      image :[this.products.image], 
      type: [this.products.type],
      price: [this.products.price],
      expiry_date: [this.products.expiry_date],
      alert_quantity: [this.products.alert_quantity],  
      manufacturing_cost: [this.products.manufacturing_cost],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  } 
  ngOnInit(): void {
    this.getArticless(); 
    this.getProducts();
  }

  getArticless() {
    this.article = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,/* 
      service_id : this.authService.currentUserValue.idSection, */
    }
    this.servicesService.getObjetss(
      this.servicesService.route.articles[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.articles = res.data;
        this.article = false;
      },
    });
  }

  getProducts() {  
    if (this.f['nbrProduct'].value <= this.products.articles.length) {
      this.productArrys = [];
      for (let product = 0; product <  this.f['nbrProduct'].value; product++) {
        let paylaod = {
          id: this.products.articles[product]?.id || null,
          quantity : this.products.articles[product]?.quantity || null, 
        };
        this.productArrys.push(paylaod);
      } 
    } else { 
      for (let product = this.products.articles.length; product < this.f['nbrProduct'].value; product++) {
        let paylaod = {
          id: this.products.articles[product]?.id || null,
          quantity : this.products.articles[product]?.quantity || null, 
        };
        this.productArrys.push(paylaod);
      } 
    }
  }

  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.productForm.controls;
  }

  // consommation de api de creation d'un product
  updateProducts() {
    // stockage des données du formulaire dans un objet
    // de type product qui sera envoyé a api
    let photo = new FormData(); 
    this.loading = true
    let test = true  
    let expiry_date
    if (this.f['image'].value === this.products.image){
      this.image = this.products.image;
    } else if (this.f['image'].value != '' && this.f['image'].value != undefined){
      let photo = new FormData();
      photo.append(
        "photo", 
        this.f['image'].value, 
        this.f['image'].value.name
      );
      this.image = this.f['image'].value.name;
      this.servicesService.addphoto(photo).subscribe({
        next: (res) => {}
      });
    } 

    if (this.f['expiry_date'].value != '' && this.f['expiry_date'].value != this.products.expiry_date) {
      expiry_date = formatDate(this.f['expiry_date'].value,'YYYY-MM-dd', 'en-US')
    }else {
      expiry_date = this.products.expiry_date
    }

    for (let product of this.productArrys) {
      if ( product.id === null || product.quantity === null || product.unit_price === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = false
      } else{
        test = false
        this.productData = {
          image :this.image,
          name: this.f['name'].value,
          type: 'storable',
          price: this.f['price'].value,
          expiry_date: expiry_date,
          alert_quantity: this.f['alert_quantity'].value,
          description: this.f['description'].value, 
          manufacturing_cost : this.f['manufacturing_cost'].value, 
          status: "validated",
          service_id: 2,
          articles : this.productArrys,
        };
      }
    } 
    this.servicesService.updateObjets(
      this.servicesService.route.products[0],
      this.products.id, this.productData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(
          'un probleme est survenu veillez contactez administration');
      },
    });
  }
}
