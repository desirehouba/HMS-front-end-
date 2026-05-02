import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ArticlesService } from '../../articles.service';
import { UntypedFormControl, Validators,
  UntypedFormGroup, UntypedFormBuilder,
} from '@angular/forms';
import { Articles } from 'src/app/core/models/articles.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  articles: Articles;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class ArticleFormDialogComponent {
  dialogTitle: string;
  articleForm: UntypedFormGroup;
  articles: Articles;
  loading = false
  services: any[] = [];
  suppliers: any[] = [];
  supplier!:any
  image !: any
  constructor(
    public dialogRef: MatDialogRef<ArticleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public articlesService: ArticlesService,
    private fb: UntypedFormBuilder,
    public servicesService: ServicesService,
    private authService : AuthService
  ) {
    this.dialogTitle = data.articles.name;
    this.image = environment.imageDirectoryPatchs;
    this.articles = data.articles;
    this.articleForm = this.createContactForm();
    if (this.articles.suppliers != null && this.articles.suppliers.length != 0) {
      this.supplier = this.articles.suppliers[0].id
      
      console.log(this.supplier);
      
    }
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.articles.id],
      name: [this.articles.name],
      description: [this.articles.description],
      price: [this.articles.price],
      service : [this.articles.service.id],
      type : [this.articles.type],
      alert_quantity:  [this.articles.alert_quantity], 
      expiry_date:  [this.articles.expiry_date], 
      suppliers:  [this.supplier],
      unit_of_measurement:  [this.articles.unit_of_measurement],
      image:  [this.articles.image] ,
      container:  [this.articles.container],
      container_quantity:  [this.articles.container_quantity],
      container_unit:  [this.articles.container_unit],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getServicess();
    this.getSupplierss();
  }

  getServicess() {
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.departements[1], paylaod
    ).subscribe({
      next: (res) => {
        this.services = res.data;
      },
    });
  }
  getSupplierss() {
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      role_id : 4
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.suppliers = res.data;
      },
    });
  }

  get f() {
    return this.articleForm.controls;
  }

  // consommation de api de creation d'un privilige
  updateArticles() {
    // stockage des données du formulaire dans un objet
    // de type article qui sera envoyé a api
    this.loading = true
    let photo = new FormData();
    let image 
    if (this.f['image'].value === this.articles.image){
      this.image = this.articles.image;
    } else if (this.f['image'].value != '' && this.f['image'].value != undefined){
      let photo = new FormData();
      photo.append(
        "photo", 
        this.f['image'].value, 
        this.f['image'].value.name
      );
      image = this.f['image'].value.name;
      this.servicesService.addphoto(photo).subscribe({
        next: (res) => {}
      });
    }
    let expiry_date
    if (this.f['expiry_date'].value != '') {
      expiry_date = formatDate(this.f['expiry_date'].value,'YYYY-MM-dd', 'en-US')
    }
    const articleData = {
      image: image, 
      container: this.f['container'].value,
      container_quantity: this.f['container_quantity'].value,
      container_unit: this.f['container_unit'].value,
      unit_of_measurement: this.f['unit_of_measurement'].value,
      name: this.f['name'].value,
      type: this.f['type'].value,
      price: this.f['price'].value,
      alert_quantity: this.f['alert_quantity'].value,
      expiry_date: expiry_date,
      description: this.f['description'].value,
      service_id : this.f['service'].value, 
      hotel_id : this.authService.currentUserValue.hotel_id,
    };
    
    this.servicesService.updateObjets(
      this.servicesService.route.articles[0],
      this.articles.id, articleData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
