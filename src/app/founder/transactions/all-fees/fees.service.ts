import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Fees } from 'src/app/core/models/feestransactions.model';
@Injectable()
export class FeesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/fees.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Fees[]> = new BehaviorSubject<Fees[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paylaod: any = {};
  dialogData!: Fees;
  constructor(
    private httpClient: HttpClient,
    private authService : AuthService) {
    super();
  }
  get data(): Fees[] {
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
  getAllFeess(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items,
      idSchool : this.authService.currentUserValue.idSchool,
      idSection: this.authService.currentUserValue.idSection,
      date_start: localStorage.getItem('date_start'),
      date_end: localStorage.getItem('date_end'),
    }

    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/feeusersall`, this.paylaod
    ).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.data);
        localStorage.setItem('xf', data.sommes);
        localStorage.setItem('xfoms', data.om);
        localStorage.setItem('xfcash', data.cash);
        localStorage.setItem('xfbank', data.bank);
        console.log(data);
        this.metaChange.next(data.meta);
      },
    });
  }

  deleteFeeUsers(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/feeusers/${id}`)
       .subscribe({
          next: (data) => {},
          error: (error) => {
            console.log(error);
          },
      });
  }
}
