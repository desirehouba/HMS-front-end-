import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Orders } from 'src/app/core/models/orders.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class OrdersService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/orders.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Orders[]> = new BehaviorSubject<Orders[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Orders;
  paylaod: any = {};
  statusOrder!:any
  total_manufacturing_cost!: any
  total_price!: any
  total_profit!: any
  total_rest_paid!: any
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService: AuthService
  ) {
    super();
  }
  get data(): Orders[] {
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
  getAllOrderss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    } 
    this.paylaod = { 
      hotel_id: this.authService.currentUserValue.hotel_id,
      service_id: 3,
      date_start: localStorage.getItem('date_start_order_Bar'),
      date_end: localStorage.getItem('date_end_order_Bar'),
      status : localStorage.getItem('statusOrder') ? JSON.parse(localStorage.getItem('statusOrder') || '') : '', 
      payment_status: localStorage.getItem('paymentStatusOrder') ? JSON.parse(localStorage.getItem('paymentStatusOrder') || '') : '', 
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/orders/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          this.metaChange.next(data.meta);
          this.total_manufacturing_cost = data.total_manufacturing_cost
          this.total_price = data.total_price
          this.total_profit = data.total_profit 
          this.total_rest_paid = data.total_rest_paid
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

}
