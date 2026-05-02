import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Retraits } from 'src/app/core/models/retraits.model';
import { ServicesService } from 'src/app/core/service/services.service';
@Injectable()
export class RetraitsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/apis.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Retraits[]> = new BehaviorSubject<Retraits[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: any;
  payload!: any;
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService,
    private servicesService : ServicesService) {
    super();
  }
  get data(): Retraits[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */


  // consomation api list roles
  getAllOmss(): void {
    //if
    const paylaod = {
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/withdrawalsall`, paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          console.log(data);
        },
      });
  }

}
