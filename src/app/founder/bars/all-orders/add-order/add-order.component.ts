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
import { environment } from "src/environments/environment";
import { AddCustomerFormDialogComponent } from "src/app/founder/pop-up/add-customer/add-customer.component";
import { AddOrderFormDialogComponent } from "src/app/founder/pop-up/add-order/add-order.component";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.scss"],
})
export class AddOrderComponent {
  orderForm: UntypedFormGroup;

  products: Products[] = [];
  rooms: Rooms[] = [];
  customers: any[] = [];
  filterCustomers: any[] = [];
  orderArrys: any[] = [];
  numbersOrders = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  orderData: any;
  customer = false;
  loading = false;
  room = false;
  product = false;
  image = "";
  SelectProducts: any[] = []

  onInputChange(event: any) {

    const searchInput = event.target.value.toLowerCase();
    this.filterCustomers = this.customers.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  onOpenChange(searchInput: any) {
    searchInput.value = "";
    this.filterCustomers = this.customers;
  }

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
    this.image = environment.imageDirectoryPatchs
    this.orderForm = this.fb.group({
      nbrOrder: [0, [Validators.required]],/* 
      payment_mode: ['', [Validators.required]], */
      delivery_date: ['' ],
      customer_id: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getProductss();
    this.getCustomerss();
    this.getRoomss() 
  }

  addRoom(data : any){
    this.SelectProducts.push(data);
  }
  removeRoom(data : any){
    this.SelectProducts.splice(this.products.indexOf(data), 1);
  }


  getProductss() {
    this.product = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      service_id : 3,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.products[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.products = res.data;
        this.product = false; 
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.products = this.products.sort(SortArray);
      },
    });
  } 

  getCustomerss() {
    this.customer = true;
    const paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id,
      role_id: 5
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.customer = false;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.customers = this.customers.sort(SortArray);
        this.filterCustomers = this.customers.sort(SortArray);
      },
      error: (error) => {
        this.customer = false;
      }, 
    });
  }

  getRoomss() {
    this.product = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      status : "busy",
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

  getOrders() {
    this.orderArrys = [];
    for (let order = 1; order <= this.f['nbrOrder'].value; order++) {
      let paylaod = {
        id: null,
        quantity : null,
      };
      this.orderArrys.push(paylaod);
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
        this.getCustomerss();
      }
    });
  }

  editCallOrder() {
    this.orderData = {
      //payment_mode: this.f['payment_mode'].value,
      customer_id: this.f['customer_id'].value,
      delivery_date: this.f['delivery_date'].value,
      products : this.SelectProducts,
    };
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddOrderFormDialogComponent, {
      data: {
        service_id : 3,
        orders: this.orderData,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getCustomerss();
      }
    });
  }

  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.orderForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/bars/all-orders"]
    );
  }

  // consommation de api de creation d'un order
  addOrders() {
    // stockage des données du formulaire dans un objet
    // de type order qui sera envoyé a api
    let test = true
    this.loading = true;
    for (let order of this.orderArrys) {
      if ( order.id === null || order.quantity === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = false
      } else{
        test = false
        this.orderData = {
          payment_mode: this.f['payment_mode'].value,
          customer_id: this.f['customer_id'].value,
          delivery_date: this.f['delivery_date'].value != '' ? formatDate(this.f['delivery_date'].value,'YYYY-MM-dd', 'en-US') : '',
          status: "pending",
          products : this.SelectProducts,
        };
      }
    }
    
    if (!test) {
      this.servicesService.addObjets(
        this.servicesService.route.orders[0], this.orderData
      ).subscribe({
        next: (data) => {
          this.loading = false;
          this.orderArrys = [];
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
