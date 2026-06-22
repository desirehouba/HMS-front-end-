import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Orders } from 'src/app/core/models/orders.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';

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
    payments = false;
    services: any[] = [];
    message: string = 'app.message_transaction_encour';
    valider: string = 'app.validation_payment'; 
    payment_modes = ['Orange Money','Mobile Money'];
    constructor(
      public dialogRef: MatDialogRef<AboutOrderComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private servicesService : ServicesService,
      private fb: UntypedFormBuilder,
      private authService : AuthService,
    ) {
      this.dialogTitle = data.orders?.customer?.name;
      this.orders = data.orders; 
      
      this.orderForm = this.fb.group({ 
        payment_mode: ['', [Validators.required]],
        amount: ['', [Validators.required]], 
        date: ['', [Validators.required]],
      });
    }
  
    getCustomerss() { 
      const paylaod = {
        hotel_id: this.authService.currentUserValue.hotel_id,
        type: 'Bar'
      }
      this.servicesService.getObjetss(
        this.servicesService.route.services[1], paylaod
      ).subscribe({
        next: (res) => {
          this.services = res.data; 
        }, 
      });
    }
  
    ordersActions(data : string) {
      this.loading = true;
      const orderData = {
        customer_id: this.orders?.customer?.id, 
        status : data,
        payment_mode: this.orders?.payment_mode,   
        products : this.orders?.products
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
      
        seller_id: this.orders?.customer?.id,
        order_id: this.orders.id,
        amount: this.f['amount'].value, 
        date: formatDate(this.f['date'].value,'YYYY-MM-dd', 'en-US'),
        payment_method: this.f['payment_mode'].value,
        service_id: this.services[0].id,
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
    
  
    addTransactionsOption() {  
      if (this.f['payment_mode'].value === 'Orange Money') { 
        this.effectuerTransactMobile(this.servicesService.route.payments[0], this.servicesService.route.payments[1])
      } else if (this.f['payment_mode'].value === 'Mobile Money') {
        this.effectuerTransactMobile(this.servicesService.route.paymentsMomo[0], this.servicesService.route.paymentsMomo[1])
      } else {
        this.addCashIn()
      }  
    }
  
    
    // consommation de api de creation d'un privilige
     
    effectuerTransactMobile(data : any, route : string) {  
      const payload = {
        reference: 'Paiement chez '+this.authService.currentUserValue.hotelName,
        amount: this.f['amount'].value*1.02,
        phonePayeur: this.f['phone'].value,
        order_id: this.orders.id,
        payment_mode: this.f['payment_mode'].value,  
        service_id : 1,
        date: formatDate(this.f['date'].value,'YYYY-MM-dd', 'en-US'),  
      }; 
      this.loading = true;  
      this.servicesService.addObjets(
        data, payload
      ).subscribe({
        next: (res) => {
          this.loading = false;
          this.getStatusMobile(res.data.idTransaction,   route);
        },
        error: (error) => {
          this.loading = false; 
          if (error.message) {
            this.servicesService.showCustomPositionEchec(error.message);
          } else {
            this.servicesService.showCustomPositionEchec(error);
          }
        }, 
      });  
    }
    
    getStatusMobile(id: number,  route : string) {
      this.payments = true;
      this.servicesService.getStatus(
        route, id
      ).subscribe({
        next: (data) => {
          this.payments = false;
          if (data.data.status === "SUCCESSFULL" || data.data.status === "SUCCESSFUL" ) {
            this.dialogRef.close(1);
            this.loading = false;
            this.servicesService.showCustomPosition(); 
          } else if (data.data.status === "PENDING"){
            this.servicesService.showCustomPositionEchec(this.message);
            this.dialogRef.close(1);
          } else {
            this.servicesService.showCustomPositionEchec(this.message);
            this.dialogRef.close(1);
          }
        },
        error: (error) => {
          this.payments = false; 
          if (error.message) {
            this.servicesService.showCustomPositionEchec(error.message);
            this.dialogRef.close(1);
          } else {
            this.servicesService.showCustomPositionEchec(error);
            this.dialogRef.close(1);
          }
        },
      });
    }
  }
  