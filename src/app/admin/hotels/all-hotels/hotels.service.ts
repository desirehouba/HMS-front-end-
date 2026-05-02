import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Hotels } from 'src/app/core/models/hotels.model';
@Injectable()
export class HotelsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/hotels.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Hotels[]> = new BehaviorSubject<Hotels[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Hotels;
  constructor(
    private httpClient: HttpClient,
    private router : Router) {
    super();
  }
  get data(): Hotels[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getFounderss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users`, paylaod);
  }

  getPackagess() {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/packages`);
  }

  // consomation api list roles
  getAllHotelss(): void {
    const paylaod = {
      page_items:1,
      nbre_items:10,
      /*filter_value:, 
      founder_id: ‘integer’,
      manager_id: ‘integer’, */
  
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/hotels/all`, paylaod).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.data);
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  

  // consomation api add roles
  addHotels(hotels: any): void {
    this.dialogData = hotels;
    this.httpClient.post<any>(
      `${environment.apiUrl}/hotels`, hotels)
       .subscribe({
          next: (data) => {
            console.log("c'est bon");
            
            console.log(data);
            this.dialogData = hotels;
            this.router.navigate(
              ["/admin/hotels/all-hotels"]
            );
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  // consomation api update roles
  updateHotels(id: number, datas : any, ): void {
    this.httpClient.put<any>(
      `${environment.apiUrl}/hotels/${id}`, datas)
       .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
      });
  }
  
  // consomation api delete roles
  deleteHotels(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/hotels/${id}`)
       .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

}
