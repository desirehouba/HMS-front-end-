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
import { Products } from "src/app/core/models/products.model";
import { Rooms } from "src/app/core/models/rooms.model";

@Component({
  selector: "app-add-articleMovement",
  templateUrl: "./add-articleMovement.component.html",
  styleUrls: ["./add-articleMovement.component.scss"],
})
export class AddArticleMovementComponent {
  articleMovementForm: UntypedFormGroup;

  products: Products[] = [];
  rooms: Rooms[] = [];
  customers: any[] = [];
  articleMovementArrys: any[] = [];
  numbersArticleMovements = [1,2,3,4,5,6,7,8,9,10]
  articleMovementData: any;
  customer = false;
  loading = false;
  room = false;
  product = false;
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
    this.articleMovementForm = this.fb.group({
      nbrArticleMovement: [0, [Validators.required]],
      payment_mode: ['', [Validators.required]],
      room_id: ['', [Validators.required]],
      customer_id: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getProductss();
    this.getCustomerss();
    this.getRoomss()
    this.scholar_level = this.authService.currentUserValue.scholar_level
  }


  getProductss() {
    this.product = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,/* 
      service_id : this.authService.currentUserValue.idSection, */
    }
    this.servicesService.getObjetss(
      this.servicesService.route.products[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.products = res.data;
        this.product = false;
      },
    });
  }

  getCustomerss() {
    this.customer = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,/* 
      service_id : this.authService.currentUserValue.idSection, */
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.customer = false;
      },
    });
  }

  getRoomss() {
    this.product = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,/* 
      service_id : this.authService.currentUserValue.idSection, */
    }
    this.servicesService.getObjetss(
      this.servicesService.route.rooms[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.rooms = res.data;
        this.room = false;
      },
    });
  }

  getArticleMovements() {
    this.articleMovementArrys = [];
    for (let articleMovement = 1; articleMovement <= this.f['nbrArticleMovement'].value; articleMovement++) {
      let paylaod = {
        id: null,
        quantity : null,
      };
      this.articleMovementArrys.push(paylaod);
    }
  }

  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.articleMovementForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/pedogogies/all-articleMovements"]
    );
  }

  // consommation de api de creation d'un articleMovement
  addArticleMovements() {
    // stockage des données du formulaire dans un objet
    // de type articleMovement qui sera envoyé a api
    let test = true
    this.loading = true;
    for (let articleMovement of this.articleMovementArrys) {
      if ( articleMovement.id === null || articleMovement.quantity === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = false
        console.log(test);
      } else{
        test = false
        this.articleMovementData = {
          payment_mode: this.f['payment_mode'].value,
          customer_id: this.f['customer_id'].value,
          room_id: this.f['room_id'].value,
          products : this.articleMovementArrys,
        };
      }
    }
    
    if (!test) {
      this.servicesService.addObjets(
        this.servicesService.route.articleMovements[0], this.articleMovementData
      ).subscribe({
        next: (data) => {
          this.loading = false;
          this.articleMovementArrys = [];
          this.servicesService.showCustomPosition();
        },
        error: (error) => {
          this.loading = false;
          this.servicesService.showCustomPositionEchec(error);
        }, 
      });
    }
  }
}
