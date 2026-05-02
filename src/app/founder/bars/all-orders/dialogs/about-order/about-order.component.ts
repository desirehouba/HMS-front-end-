import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Orders } from 'src/app/core/models/orders.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  orders: Orders;
}

@Component({
  selector: 'app-about-order',
  templateUrl: './about-order.component.html',
  styleUrls: ['./about-order.component.scss'],
})
export class AboutOrderComponent {
  dialogTitle: string;
  orders: Orders;
  orderForm: UntypedFormGroup; 
  loading = false;
  payment = false
  constructor(
    public dialogRef: MatDialogRef<AboutOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private servicesService : ServicesService,
    private fb: UntypedFormBuilder,
  ) {
    this.dialogTitle = data.orders.customer.name;
    this.orders = data.orders; 
    
    this.orderForm = this.fb.group({ 
      payment_mode: ['', [Validators.required]],
      amount: ['', [Validators.required]], 
      date: ['', [Validators.required]],
    });
  }

  ordersActions(data : string) {
    this.loading = true;
    const orderData = {
      customer_id: this.orders.customer.id, 
      status : data,
      payment_mode: this.orders.payment_mode,   
      products : this.orders.products
    }; 
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.orders[0],
      this.orders.id, orderData
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

  getCashin(data: boolean ){
    this.payment = data
  }

  get f() {
    return this.orderForm.controls;
  } 
  // consommation de api de creation d'un privilige
  addCashIn() { 
    // stockage des données du formulaire dans un objet
    // de type customer qui sera envoyé a api
    const customerData = { 
    
      seller_id: this.orders.customer.id,
      order_id: this.orders.id,
      amount: this.f['amount'].value, 
      date: formatDate(this.f['date'].value,'YYYY-MM-dd', 'en-US'),
      payment_method: this.f['payment_mode'].value,
      service_id: 3,
    };
    this.loading = true; 

    this.servicesService.addObjets(
      this.servicesService.route.cashIns[0], customerData
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
