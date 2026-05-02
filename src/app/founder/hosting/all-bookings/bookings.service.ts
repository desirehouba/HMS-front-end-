import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bookings } from 'src/app/core/models/bookings.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
@Injectable()
export class BookingsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/bookings.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Bookings[]> = new BehaviorSubject<Bookings[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Bookings;
  paylaod: any = {};
  total_amount_paid!:any
  total_price !: any
  total_rest_paid!:any
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService :AuthService,
    public servicesService : ServicesService ) {
    super();
  }
  get data(): Bookings[] {
    return this.dataChange.value;
  }
  get meta(): any {
    return this.metaChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  // consomation api list roles
  getAllBookingss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id, 
      date_start: localStorage.getItem('date_start_booking'),
      date_end: localStorage.getItem('date_end_booking'), 
      payment_status: localStorage.getItem('paymentStatusBookings') ? JSON.parse(localStorage.getItem('paymentStatusBookings') || '') : '', 
      status: localStorage.getItem('statusBookings') ? JSON.parse(localStorage.getItem('statusBookings') || '') : '', 
      user_id : localStorage.getItem('clientBookings') ? JSON.parse(localStorage.getItem('clientBookings') || '') : '',
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/bookings/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data); 
          this.metaChange.next(data.meta);
          this.total_amount_paid= data.total_amount_paid
          this.total_price = data.total_price
          this.total_rest_paid= data.total_rest_paid
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  // consomation api delete roles
  deleteBookings(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/users/${id}`)
       .subscribe({
          next: (data) => { },
          error: (error) => { },
      });
  }

}
