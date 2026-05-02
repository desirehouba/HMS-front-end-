import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Holidays } from 'src/app/core/models/holidays.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class HolidaysService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/holidays.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Holidays[]> = new BehaviorSubject<Holidays[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paylaod: any = {};
  dialogData!: Holidays;
  start_date!: any
  priority!: any
  status!: any
  idUser!: any
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService 
  ) {
    super();
  }
  get data(): Holidays[] {
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
  getAllHolidayss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    if (localStorage.getItem('start_dateHolidays') ) {
      this.start_date = JSON.parse(localStorage.getItem('start_dateHolidays') || '')
    }
    if (localStorage.getItem('priorityHolidays')) {
      this.priority = JSON.parse(localStorage.getItem('priorityHolidays') || '')
    }
    if (localStorage.getItem('idUserHolidays') ) {
      this.idUser = JSON.parse(localStorage.getItem('idUserHolidays') || '')
    }
    if (localStorage.getItem('statusHolidays')) {
      this.status = JSON.parse(localStorage.getItem('statusHolidays') || '')
    }
    this.paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      filter_value: data,
      start_date: this.start_date,
      status: this.status,
      idUser: this.idUser,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/holidays/all`, this.paylaod)
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
  deleteHolidays(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/holidays/${id}`)
       .subscribe({
          next: (data) => {},
          error: (error) => {
            console.log(error);
          },
      });
  }

}
