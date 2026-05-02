import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Events } from 'src/app/core/models/events.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class EventsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/events.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Events[]> = new BehaviorSubject<Events[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Events;
  paylaod: any = {};
  constructor(
    private httpClient: HttpClient,
    private authService : AuthService 
  ) {
    super();
  }
  get data(): Events[] {
    return this.dataChange.value;
  }
  get meta(): any {
    return this.metaChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  // consomation api list events
  getAllEventss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/events/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          this.metaChange.next(data.meta);
          console.log(data.data);
          
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }



  // consomation api delete roles
  deleteEvents(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/events/${id}`)
       .subscribe({
          next: (data) => {},
          error: (error) => {},
      });
  }

}
