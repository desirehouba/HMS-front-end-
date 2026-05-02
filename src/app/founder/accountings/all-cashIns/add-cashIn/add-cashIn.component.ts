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
import { Products } from "src/app/core/models/products.model";
import { Rooms } from "src/app/core/models/rooms.model";
import { Direction } from "@angular/cdk/bidi"; 
import { MatDialog } from "@angular/material/dialog";
import { AddCustomerFormDialogComponent } from "src/app/founder/pop-up/add-customer/add-customer.component";

@Component({
  selector: "app-add-cashIn",
  templateUrl: "./add-cashIn.component.html",
  styleUrls: ["./add-cashIn.component.scss"],
})
export class AddCashInComponent {
  cashInForm: UntypedFormGroup;

  products: Products[] = [];
  rooms: Rooms[] = [];
  orders: any[] = [];
  cashInArrys: any[] = [];
  numbersCashIns = [1,2,3,4,5,6,7,8,9,10]
  cashInData: any;
  order = false;
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
    public dialog: MatDialog,
    public translateService: TranslateService,
    private servicesService: ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem("lang") as string
    );
    this.cashInForm = this.fb.group({
      nbrCashIn: [0, [Validators.required]],
      payment_mode: ['', [Validators.required]],
      room_id: ['', [Validators.required]],
      customer_id: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getProductss();
    this.getOrderss();
    this.getRoomss()
    this.scholar_level = this.authService.currentUserValue.scholar_level
  }


  getProductss() {
    this.product = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,/* 
      service_id : this.authService.currentUserValue.service_id, */
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

  getOrderss() {
    this.order = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,/* 
      service_id : this.authService.currentUserValue.service_id, */
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.orders = res.data;
        this.order = false;
      },
    });
  }

  getRoomss() {
    this.product = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,/* 
      service_id : this.authService.currentUserValue.service_id, */
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

  getCashIns() {
    this.cashInArrys = [];
    for (let cashIn = 1; cashIn <= this.f['nbrCashIn'].value; cashIn++) {
      let paylaod = {
        id: null,
        quantity : null,
      };
      this.cashInArrys.push(paylaod);
    }
  }
  

  editCall() {
    let row
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddCustomerFormDialogComponent, {
      data: {
        bookings: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getOrderss();
      }
    });
  }

  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.cashInForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/accountings/all-cashIns"]
    );
  }

  // consommation de api de creation d'un cashIn
  addCashIns() {
    // stockage des données du formulaire dans un objet
    // de type cashIn qui sera envoyé a api 
    this.loading = true;
    const cashInData = {
      payment_method: this.f['payment_method'].value,
      amount: this.f['amount'].value,
      seller_id: this.f['seller_id'].value,
      order_id : this.f['order_id'].value,
    }; 
    this.servicesService.addObjets(
      this.servicesService.route.cashIns[0], cashInData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
      },
      error: (error) => {
        this.loading = false;
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }
}
