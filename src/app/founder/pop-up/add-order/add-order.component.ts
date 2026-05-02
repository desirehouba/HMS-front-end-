import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core'; 
import { UntypedFormControl, Validators,
  UntypedFormGroup, UntypedFormBuilder,} from '@angular/forms'; 
import { AuthService } from 'src/app/core/service/auth.service';
;
import { ServicesService } from 'src/app/core/service/services.service';
import { TranslateService } from '@ngx-translate/core';
import { formatDate } from '@angular/common';  
import { Orders } from 'src/app/core/models/orders.model';

export interface DialogData {
  id: number;
  action: string;
  orders: Orders;
  service_id : number,
}

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderFormDialogComponent { 
  orderForm: UntypedFormGroup; 
  loading = false;
  orders:   any;
  services: any[] = [];
  suppliers: any[] = [];
  orderArrys: any[] = [];
  orderData!: any;
  service_id : number
  products: any[] = [];
  rooms: any[] = [];
  customers: any[] = [];  
  customer = false; 
  room = false;
  product = false;
  image = "";
  SelectProducts: any[] = []
  constructor(
    public dialogRef: MatDialogRef<AddOrderFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private authService: AuthService,  
    public translateService : TranslateService,
    private servicesService: ServicesService, 
  ) {
      this.orders = data.orders;
      this.service_id = data.service_id;
      console.log('orders', this.orders);
      
      translateService.setDefaultLang(
        localStorage.getItem('lang') as string
      );
      this.orderForm = this.fb.group({ 
        nbrOrder: [this.orders.products.length ],
        payment_mode: [this.orders.payment_mode],
        room_id: [this.orders.room_id ],
        customer_id: [this.orders.customer_id, [Validators.required]],
      });
    }

  
    ngOnInit(): void {
      this.getProductss();
      this.getCustomerss();
      this.getRoomss();
      this.getOrders()
    }
  
  getProductss() {
    this.product = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      service_id : this.service_id,
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
        this.getOrders()
      },
    });
  }

  getCustomerss() {
    this.customer = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      role_id : 5,
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
   
  onNoClick(): void {
    this.dialogRef.close();
  } 
  
  getOrders() {
    this.orderArrys = [];
    for (let order = 1; order <= this.f['nbrOrder'].value; order++) {
      let paylaod = {
        id: this.orders.products[order-1]  || null,
        quantity :   null, 
      };
      this.orderArrys.push(paylaod);
    } 
    console.log(this.orderArrys);
    
  }

  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.orderForm.controls;
  }

  // consommation de api de creation d'un order
  addOrder(data :  any) {
    // stockage des données du formulaire dans un objet
    // de type order qui sera envoyé a api 
    this.loading = true
    let test = true 
    for (let order of this.orderArrys) {
      if ( order.id === null || order.quantity === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        this.loading = false 
      } else{
        test = false
        this.orderData = {
          payment_mode: this.f['payment_mode'].value,
          customer_id: this.f['customer_id'].value,
          room_id: this.f['room_id'].value,
          status: "confirmed",
          products : this.orderArrys,  
        }; 
      }
    } 
    if (!test) { 
      this.servicesService.addObjets(
        this.servicesService.route.orders[0], this.orderData
      ).subscribe({
        next: (data) => {
          this.loading = false; 
          this.servicesService.showCustomPosition();
        this.dialogRef.close(1);
        },
        error: (error) => {
          this.loading = false;
          this.servicesService.showCustomPositionEchec(error);
        }, 
      });
    }
  }
}
