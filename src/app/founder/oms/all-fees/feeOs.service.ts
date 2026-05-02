import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Transactions } from 'src/app/core/models/transactions.model';
import { ServicesService } from 'src/app/core/service/services.service';
@Injectable()
export class Fee0sService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/apis.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Transactions[]> = new BehaviorSubject<Transactions[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: any;
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService,
    private servicesService : ServicesService) {
    super();
  }
  get data(): Transactions[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */


  // consomation api list roles
  getAllFee0ss(): void {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection: this.authService.currentUserValue.idSection,
      date_start: localStorage.getItem('date_start'),
      date_end: localStorage.getItem('date_end'),
      payment_mode: 'Orange Money',
    }
    console.log(paylaod);
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/feeusersall`, paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          localStorage.setItem('xfom', data.om);
          console.log(data);
        },
      });
  }


}
