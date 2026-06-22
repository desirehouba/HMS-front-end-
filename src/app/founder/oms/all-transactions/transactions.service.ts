import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Transactions } from 'src/app/core/models/transactions.model';
import { ServicesService } from 'src/app/core/service/services.service';
@Injectable()
export class TransactionsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/transactions.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Transactions[]> = new BehaviorSubject<Transactions[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paylaod: any = {};
  dialogData!: any;
  
  statusTransactions!: any
  constructor(
    private httpClient: HttpClient,
    private authService : AuthService) {
    super();
  }
  get data(): Transactions[] {
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
  getAllTransactionss(data: any, pageItems : number, nbreItems: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }

    if (localStorage.getItem('statusTransactions')) {
      this.statusTransactions = JSON.parse(localStorage.getItem('statusTransactions') || '')
    }
    this.paylaod = {
      filter_value: data,
      pageItems: pageItems+1,
      nbreItems: nbreItems,
      date: localStorage.getItem('date_start'),
      status: this.statusTransactions,
      //idStudent : 1006
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/transactions/all`, this.paylaod
    ).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.data);
        /* localStorage.setItem('x', data.sommes);
        localStorage.setItem('xoms', data.om);
        localStorage.setItem('xcash', data.cash);
        localStorage.setItem('xbank', data.bank); */
        this.metaChange.next(data.meta);
        console.log(data);
      },
    });
  }

  // consomation api add roles
  addTransactions(transactions: any){
    this.httpClient.post<any>(
      `${environment.apiUrl}/pensionUsers`, transactions);
  }

  findProgressions(transactions: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/pensionUsers`, transactions);
  }

}
