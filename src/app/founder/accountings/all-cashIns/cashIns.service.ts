import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CashIns } from 'src/app/core/models/cashIns.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class CashInsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/cashIns.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<CashIns[]> = new BehaviorSubject<CashIns[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: CashIns;
  paylaod: any = {}; 
  statusCashIn!:any
  total!: any 
  om!: any
  momo!: any
  cash!: any
  bank!: any
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService: AuthService
  ) {
    super();
  }
  get data(): CashIns[] {
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
  getAllCashInss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    } 
    this.paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id, 
      date_start: localStorage.getItem('date_start'),
      date_end: localStorage.getItem('date_end'),
      created_by: localStorage.getItem('createdCashIns') ? JSON.parse(localStorage.getItem('createdCashIns') || '') : '', 
      service_id: localStorage.getItem('serviceCashIns') ? JSON.parse(localStorage.getItem('serviceCashIns') || '') : '', 
      client_id : localStorage.getItem('clientCashIns') ? JSON.parse(localStorage.getItem('clientCashIns') || '') : '',
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/cash-ins/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          this.metaChange.next(data.meta); 
          this.total= data.total_amount
          this.om = data.statistiques.OM
          this.momo= data.statistiques.MOMO
          this.cash = data.statistiques.Cash
          this.bank= data.statistiques.bank
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

}
