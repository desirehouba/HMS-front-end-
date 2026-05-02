import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoices } from 'src/app/core/models/invoices.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
@Injectable()
export class PayrollsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/payrolls.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Invoices[]> = new BehaviorSubject<Invoices[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Invoices;
  paylaod: any = {};
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService :AuthService,
    public servicesService : ServicesService ) {
    super();
  }
  get data(): Invoices[] {
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
  getAllPayrollss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idTypeInvoice : 1,
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/payrolls/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          console.log(data);
          this.metaChange.next(data.meta);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  // consomation api delete roles
  deletePayrolls(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/users/${id}`)
       .subscribe({
          next: (data) => { },
          error: (error) => { },
      });
  }

}
