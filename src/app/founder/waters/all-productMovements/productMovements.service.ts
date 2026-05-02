import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductMovements } from 'src/app/core/models/productMovements.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class ProductMovementsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/productMovements.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<ProductMovements[]> = new BehaviorSubject<ProductMovements[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: ProductMovements;
  paylaod: any = {};
  operationType!:any
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService: AuthService
  ) {
    super();
  }
  get data(): ProductMovements[] {
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
  getAllProductMovementss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    } 
    this.paylaod = {
      date_start: localStorage.getItem('date_start_water_mvt'),
      date_end: localStorage.getItem('date_end_water_mvt'),
      operation_type : localStorage.getItem('operationType') ? JSON.parse(localStorage.getItem('operationType') || '') : '',
      service_id : 4,
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/product-movements/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          this.metaChange.next(data.meta);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false; 
        },
      });
  }

}
