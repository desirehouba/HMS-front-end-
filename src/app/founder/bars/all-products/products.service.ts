import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from 'src/app/core/models/products.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class ProductsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/products.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Products;
  paylaod: any = {};
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService :AuthService 
  ) {
    super();
  }
  get data(): Products[] {
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
  getAllProductss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id,
      service_id: 3,
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/products/all`, this.paylaod)
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

  // consomation api add roles
  // consomation api delete roles
  deleteProducts(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/products/${id}`)
       .subscribe({
          next: (data) => { },
          error: (error) => { },
      });
  }

}
