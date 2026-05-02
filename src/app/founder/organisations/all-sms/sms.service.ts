import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sms } from 'src/app/core/models/sms.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class SmsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/sms.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Sms[]> = new BehaviorSubject<Sms[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paylaod: any = {};
  dialogData!: Sms;
  due_date!: AnalyserOptions
  status!: any
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService 
  ) {
    super();
  }
  get data(): Sms[] {
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
  getAllSmss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    if (localStorage.getItem('due_dateSms') ) {
      this.due_date = JSON.parse(localStorage.getItem('due_dateSms') || '')
    }
    if (localStorage.getItem('statusSms')) {
      this.status = JSON.parse(localStorage.getItem('statusSms') || '')
    }
    this.paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      filter_value: data,
      due_date: this.due_date,
      status: this.status,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/sms/all`, this.paylaod)
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
  deleteSms(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/sms/${id}`)
       .subscribe({
          next: (data) => {},
          error: (error) => {
            console.log(error);
          },
      });
  }

}
