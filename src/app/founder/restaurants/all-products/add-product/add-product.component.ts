import { Component } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { ServicesService } from "src/app/core/service/services.service"
import { formatDate } from "@angular/common";
import { Articles } from "src/app/core/models/articles.model";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductsComponent {
  productForm: UntypedFormGroup;

  articles: Articles[] = [];
  productArrys: any[] = [];
  numbersProducts = [1,2,3,4,5,6,7,8,9,10]
  productData: any;
  hide = false;
  loading = false;
  mat = false;
  classe = false;
  article = false;
  scholar_level = "";
  breadscrums = [
    {
      title: "Add Rating",
      items: ["Rating"],
      active: "Add Rating",
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    public translateService: TranslateService,
    private servicesService: ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem("lang") as string
    );
    this.productForm = this.fb.group({
      image: [''],
      name: ["", [Validators.required]],
      price: ["", [Validators.required]],
      nbrProduct: [0, [Validators.required]],
      description: ['.', [Validators.required]],
      quantity: ['' ],
      alert_quantity: ['', [Validators.required]],
      expiry_date: ['', [Validators.required]],/* 
      type: ['', [Validators.required]], */
      manufacturing_cost: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getArticless(); 
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
    this.productArrys = [];
    for (let product = 1; product <= this.f['nbrProduct'].value; product++) {
      let paylaod = {
        id: null,
        quantity : null,
      };
      this.productArrys.push(paylaod);
    }
  }


  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.productForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/restaurants/all-products"]
    );
  }

  // consommation de api de creation d'un product
  addProducts() {
    // stockage des données du formulaire dans un objet
    // de type product qui sera envoyé a api
    let test = true
    this.loading = true;
    let photo = new FormData();
    let image
    // enregistrement de la photo du user 

    if (this.f['image'].value != '' && this.f['image'].value != undefined) {
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
    for (let product of this.productArrys) {
      if ( product.id === null || product.quantity === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = false 
        this.loading = false; 
      } else{
        test = false
        this.loading = false; 
      }
    }
    
    if (!test) {
      this.productData = {
          image :image,
          name: this.f['name'].value,
          type: 'storable',
          price: this.f['price'].value,
          expiry_date: this.f['expiry_date'].value != '' ? formatDate(this.f['expiry_date'].value,'YYYY-MM-dd', 'en-US') : '',
          alert_quantity: this.f['alert_quantity'].value,
          description: this.f['description'].value, 
          manufacturing_cost : this.f['manufacturing_cost'].value, 
          status: "validated",
          service_id: 2,
          articles : this.productArrys,
        };
      this.servicesService.addObjets(
        this.servicesService.route.products[0], this.productData
      ).subscribe({
        next: (data) => {
          this.loading = false;
          this.productArrys = [];
          this.servicesService.showCustomPosition();
          this.productForm.reset();
        },
        error: (error) => {
          this.loading = false;
          this.servicesService.showCustomPositionEchec(error);
        }, 
      });
    }
  }
}
