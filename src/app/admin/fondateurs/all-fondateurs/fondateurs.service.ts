import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Fondateurs } from 'src/app/core/models/fondateurs.model';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class FondateursService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Fondateurs[]> = new BehaviorSubject<Fondateurs[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Fondateurs;
  paylaod: any = {};
  constructor(
    private httpClient: HttpClient,
    private authService : AuthService ) {
    super();
  }
  get data(): Fondateurs[] {
    return this.dataChange.value;
  }
  get meta(): any {
    return this.metaChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getRoless() {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/roles/all`);
  }

  getForfaitss() {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/forfaits`);
  }


  // consomation api list roles
  getAllFondateurss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      role_id: 2,
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

  // consomation api add roles
 
  // consomation api delete roles
  deleteFondateurs(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/users/${id}`)
       .subscribe({
          next: (data) => {},
      });
  }

}
