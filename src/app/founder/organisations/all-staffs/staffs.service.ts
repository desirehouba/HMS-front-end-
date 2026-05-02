import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Staffs } from 'src/app/core/models/staffs.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class StaffsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/staffs.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Staffs[]> = new BehaviorSubject<Staffs[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Staffs;
  paylaod! : any;
  constructor(
    private httpClient: HttpClient,
    private authService : AuthService ) {
    super();
  }
  get data(): Staffs[] {
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
  getAllStaffss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      /* hotel_id: this.authService.currentUserValue.hotel_id,
      idSection: this.authService.currentUserValue.idSection,
      role_id: 3, */
      role_types: ["Staffs", "Direction"],
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
          console.log(data.data);
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
  deleteStaffs(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/users/${id}`)
       .subscribe({
          next: (data) => {},
          error: (error) => { },
      });
  }

}
