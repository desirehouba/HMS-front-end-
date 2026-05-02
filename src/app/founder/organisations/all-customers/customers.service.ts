import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from 'src/app/core/models/users.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class CustomersService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/customers.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Users;
  paylaod! : any;
  constructor(
    private httpClient: HttpClient,
    private authService : AuthService ) {
    super();
  }
  get data(): Users[] {
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
  getAllUserss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id,
      role_id: 5,
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/users/all`, this.paylaod)
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

  addphoto(data: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/uploadphotos`, data);
  }
  
  // consomation api delete roles
  deleteUsers(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/users/${id}`)
       .subscribe({
          next: (data) => {},
          error: (error) => { },
      });
  }

}
