import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Rooms } from 'src/app/core/models/rooms.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
@Injectable()
export class RoomsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/rooms.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Rooms[]> = new BehaviorSubject<Rooms[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Rooms;
  paylaod: any = {};
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService :AuthService,
    public servicesService : ServicesService ) {
    super();
  }
  get data(): Rooms[] {
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
  getAllRoomss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      status: localStorage.getItem('statusRoom') ? JSON.parse(localStorage.getItem('statusRoom') || '') : '', 
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/rooms/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          console.log(data);
          this.metaChange.next(data.meta);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false; 
        },
      });
  }

  // consomation api delete roles
  deleteRooms(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/users/${id}`)
       .subscribe({
          next: (data) => { },
          error: (error) => { },
      });
  }

}
