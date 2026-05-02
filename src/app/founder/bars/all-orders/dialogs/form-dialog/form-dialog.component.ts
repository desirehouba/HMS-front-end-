import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { OrdersService } from '../../orders.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Orders } from 'src/app/core/models/orders.model';
import { AuthService } from 'src/app/core/service/auth.service';
;
import { MatListOption } from '@angular/material/list';
import { ServicesService } from 'src/app/core/service/services.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  orders: Orders;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class OrdersDialogComponent {
  action: string; 
  orderForm: UntypedFormGroup;
  orders: Orders; 
  loading = false  
  products: any[] = [];
  rooms: any[] = [];
  customers: any[] = [];
  orderArrys: any[] = [];
  users: any[] = []; 
  numbersOrders = [1,2,3,4,5,6,7,8,9,10]
  orderData: any;
  hide = false; 
  room = false;
  product = false;
  customer = false;
  image!:any
  article = false; 
  constructor(
    public dialogRef: MatDialogRef<OrdersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ordersService: OrdersService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    public servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data.action; 
    this.image = environment.imageDirectoryPatchs;
    this.orders = data.orders; 
    this.orderForm = this.createContactForm();
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
      id: [this.orders.id],
      nbrOrder: [this.orders.products.length, [Validators.required]],
      payment_mode: [this.orders.payment_mode],
      room_id: ['' ],
      customer_id: [this.orders.customer.id, [Validators.required]],  
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
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

  getOrders() { 
    this.orderArrys = [];
    if (this.f['nbrOrder'].value <= this.orderArrys.length) {
      this.orderArrys = [];
      for (let order = 1; order <  this.f['nbrOrder'].value; order++) {
        let paylaod = {
          id: this.orders.products[order-1]?.id || null,
          quantity : this.orders.products[order-1]?.quantity || null, 
        };
        this.orderArrys.push(paylaod);
      } 
    } else {
      for (let order = this.orders.products.length; order <= this.f['nbrOrder'].value; order++) {
        let paylaod = {
          id: this.orders.products[order-1]?.id || null,
          quantity : this.orders.products[order-1]?.quantity || null, 
        };
        this.orderArrys.push(paylaod);
      } 
    }
  }

  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.orderForm.controls;
  }

  // consommation de api de creation d'un order
  updateOrders() {
    // stockage des données du formulaire dans un objet
    // de type order qui sera envoyé a api
    let photo = new FormData(); 
    this.loading = true
    let test = true  
    let expiry_date
    for (let order of this.orderArrys) {
      if ( order.id === null || order.quantity === null || order.unit_price === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = false
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
    this.servicesService.updateObjets(
      this.servicesService.route.orders[0],
      this.orders.id, this.orderData
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