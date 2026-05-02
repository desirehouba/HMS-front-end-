import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SalaryAdvances } from 'src/app/core/models/salaryAdvances.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
@Injectable()
export class SalaryAdvancesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/invoices.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<SalaryAdvances[]> = new BehaviorSubject<SalaryAdvances[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: SalaryAdvances;
  paylaod: any = {};
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService :AuthService,
    public servicesService : ServicesService ) {
    super();
  }
  get data(): SalaryAdvances[] {
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
  getAllSalaryAdvancess(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/salary-advancesall`, this.paylaod)
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
  deleteSalaryAdvances(id: number): void {
    this.httpClient.delete<any>(
    `${environment.apiUrl}/users/${id}`)
      .subscribe({
        next: (data) => { },
        error: (error) => { },
    });
  }
}
