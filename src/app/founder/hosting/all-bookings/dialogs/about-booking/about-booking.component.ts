import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Bookings } from 'src/app/core/models/bookings.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';

export interface DialogData {
  id: number;
  action: string;
  bookings: Bookings;
}

@Component({
  selector: 'app-about-booking',
  templateUrl: './about-booking.component.html',
  styleUrls: ['./about-booking.component.scss'],
})
export class AboutBookingComponent {
  dialogTitle: string;
  bookings: Bookings;
  orderForm: UntypedFormGroup; 
  loading = false;
  payment = false
  
  message: string = 'app.message_transaction_encour';
  valider: string = 'app.validation_payment'; 
  constructor(
    public dialogRef: MatDialogRef<AboutBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private servicesService : ServicesService,
    private fb: UntypedFormBuilder,
    private authService : AuthService,
  ) {
    this.dialogTitle = 'Reservation de ' + (data.bookings.user ? data.bookings.user.name : '');
    this.bookings = data.bookings;
    this.orderForm = this.fb.group({ 
      payment_mode: ['', [Validators.required]],
      amount: ['', [Validators.required]], 
      date: ['', [Validators.required]],
    });
  }

  bookingsActions(data : string) {
    this.loading = true;
    const bookingData = {
      start_date: this.bookings.start_date,
      end_date: this.bookings.end_date,
      user_id: this.bookings.user.id,
      rooms: this.bookings.booking_room_ids,
      status : data,
    };
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.bookings[0],
      this.bookings.id, bookingData
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

  getOrders() {
    this.loading = true;
    const bookingData = { 
      user_id: this.bookings.user.id, 
      status : 'data',
    };
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.bookings[0],
      this.bookings.id, bookingData
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
      seller_id: this.bookings.user.id,
      booking_id: this.bookings.id,
      service_id : 1,
      date: formatDate(this.f['date'].value,'YYYY-MM-dd', 'en-US'), 
      payment_method: this.f['payment_mode'].value,
      amount: this.f['amount'].value,
    };
    this.loading = true; 

    this.servicesService.addObjets(
      this.servicesService.route.cashIns[0], customerData
    ).subscribe({
      next: (data) => { 
        if(this.bookings.status === 'pending' || this.bookings.status === 'confirmed' ) {
          this.bookingsActions('checked_in')
        } else {
          this.dialogRef.close(1);
          this.loading = false;
          this.servicesService.showCustomPosition();
        } 
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }

  addTransactionsOption() {  
    if (this.f['payment_mode'].value === 'Orange Money') { 
      this.effectuerTransactMobile(this.servicesService.route.payments[1], this.servicesService.route.getstatus[1])
    } else if (this.f['payment_mode'].value === 'Mobile Money') {
      this.effectuerTransactMobile(this.servicesService.route.paymentsMomo[1], this.servicesService.route.paymentsMomo[1])
    } else {
      this.addCashIn()
    }  
  }

  effectuerTransactMobile(data : any, route : string) {  
    const payload = {
      reference: 'Paiement chez '+this.authService.currentUserValue.hotelName,
      amount: String(this.f['amount1'].value*1.02),
      phonePayeur: this.f['phone'].value,
      payment_mode: this.f['payment_mode'].value, 
      seller_id: this.bookings.user.id,
      booking_id: this.bookings.id,
      service_id : 1,
      date: formatDate(this.f['date'].value,'YYYY-MM-dd', 'en-US'), 
      payment_method: this.f['payment_mode'].value, 
    }; 
    this.loading = true;  
    this.servicesService.addObjets(
      data, payload
    ).subscribe({
      next: (res) => {
        this.loading = false;
        this.getStatusMobile(res.data.idTransaction, this.f['type'].value, route);
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
  
  getStatusMobile(id: number, type : number, route : string) {
    this.payment = true;
    this.servicesService.getStatus(
      route, id
    ).subscribe({
      next: (data) => {
        this.payment = false;
        if (data.data.status === "SUCCESSFULL" || data.data.status === "SUCCESSFUL" ) {
          this.dialogRef.close(1);
          this.loading = false;
          this.servicesService.showCustomPosition(); 
        } else if (data.data.status === "PENDING"){
          this.servicesService.showCustomPositionEchec(this.message);
        } else {
          this.servicesService.showCustomPositionEchec(this.message);
        }
      },
      error: (error) => {
        this.payment = false; 
        if (error.message) {
          this.servicesService.showCustomPositionEchec(error.message);
        } else {
          this.servicesService.showCustomPositionEchec(error);
        }
      },
    });
  }
}
