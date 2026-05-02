import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupplyDemands } from 'src/app/core/models/supplyDemands.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class SupplyDemandsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/supplyDemands.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<SupplyDemands[]> = new BehaviorSubject<SupplyDemands[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: SupplyDemands;
  paylaod: any = {};
  statusSupplyDemand!:any
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService: AuthService
  ) {
    super();
  }
  get data(): SupplyDemands[] {
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
  getAllSupplyDemandss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    if (localStorage.getItem('statusSupplyDemand')) {
      this.statusSupplyDemand = JSON.parse(localStorage.getItem('statusSupplyDemand') || '')
    }
    this.paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      status : this.statusSupplyDemand,
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/supply-demands/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          this.metaChange.next(data.meta);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

}
