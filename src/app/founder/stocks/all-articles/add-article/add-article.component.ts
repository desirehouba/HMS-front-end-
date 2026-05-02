import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service'; 
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi'; 
import { AddSupplierFormDialogComponent } from 'src/app/founder/pop-up/add-supplier/add-supplier.component';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent {
  articleForm: UntypedFormGroup;
  loading = false;
  services: any[] = [];
  suppliers: any[] = [];
  breadscrums = [
    {
      title: 'Add Article',
      items: ['Article'],
      active: 'Add Article',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private router : Router,
    public translateService: TranslateService,
    public servicesService : ServicesService,
    private authService : AuthService,
    public dialog: MatDialog,
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    this.articleForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      type: ['', [Validators.required]],
      price: ['', [Validators.required]],
      service: ['', [Validators.required]],
      alert_quantity: [''],
      expiry_date: [''],
      suppliers: [''],
      image: [''],
      unit_of_measurement: [''],
      container: [''],
      container_quantity: ['', [Validators.required]],
      container_unit: ['', [Validators.required]],
    });
  }

  get f() {
    return this.articleForm.controls;
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

  editCall() {
      let row
      let tempDirection: Direction;
      if (localStorage.getItem('isRtl') === 'true') {
        tempDirection = 'rtl';
      } else {
        tempDirection = 'ltr';
      }
      const dialogRef = this.dialog.open(AddSupplierFormDialogComponent, {
        data: {
          bookings: row,
          action: 'edit',
        },
        direction: tempDirection,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 1) {
          this.getSupplierss();
        }
      });
    }

  cancel() {
    this.router.navigate([
      "/founder/stocks/all-articles"
    ]);
  }

  // consommation de api de creation d'un privilige
  addArticle() {
    this.loading = true;
    let photo = new FormData();
    let image
    // enregistrement de la photo du user 

    if (this.f['image'].value != ''){
      image = this.f['image'].value.name;
      photo.append("photo",
        this.f['image'].value,
        this.f['image'].value.name
      );
      this.servicesService.addphoto(photo)
      .subscribe({
        next: (res) => { }
      });
    }
    /* let expiry_date
    if (this.f['expiry_date'].value != '') {
      expiry_date = formatDate(this.f['expiry_date'].value,'YYYY-MM-dd', 'en-US')
    } */
    const articleData = {
      image: image,
      suppliers: [this.f['suppliers'].value],
      name: this.f['name'].value,
      unit_of_measurement: this.f['unit_of_measurement'].value,
      type: this.f['type'].value,
      container: this.f['container'].value,
      container_quantity: this.f['container_quantity'].value,
      container_unit: this.f['container_unit'].value,
      price: this.f['price'].value,
      alert_quantity: this.f['alert_quantity'].value,/* 
      expiry_date: expiry_date, */
      description: this.f['description'].value,
      service_id : this.f['service'].value,
    };
    this.loading = true;
    let articles = {articles : [articleData]}
    this.servicesService.addObjets(
      this.servicesService.route.articles[0],
      articles
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.cancel();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
