import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Disbursements } from 'src/app/core/models/disbursements.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class DisbursementsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/disbursements.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Disbursements[]> = new BehaviorSubject<Disbursements[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Disbursements;
  paylaod: any = {};
  statusDisbursement!:any
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
  get data(): Disbursements[] {
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
  getAllDisbursementss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    } 
    this.paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,   
      date_start: localStorage.getItem('date_start_disbursement'),
      date_end: localStorage.getItem('date_end_disbursement'),
      service_id: localStorage.getItem('serviceDisbursement') ? JSON.parse(localStorage.getItem('serviceDisbursement') || '') : '',  
      status : localStorage.getItem('statusDisbursement') ? JSON.parse(localStorage.getItem('statusDisbursement') || '') : '', 
      expense_type_id: localStorage.getItem('typeDisbursement') ? JSON.parse(localStorage.getItem('typeDisbursement') || '') : '',
      responsible_id: localStorage.getItem('responsibleDisbursement') ? JSON.parse(localStorage.getItem('responsibleDisbursement') || '') : '',
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/disbursements/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          this.metaChange.next(data.meta);
          this.total= data.total_amount
          this.om = data.statistiques.OM
          this.momo= data.statistiques.momo
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
