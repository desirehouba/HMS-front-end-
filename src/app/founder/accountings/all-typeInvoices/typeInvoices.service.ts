import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeInvoices } from 'src/app/core/models/typeInvoices.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class TypeInvoicesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/typeInvoices.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<TypeInvoices[]> = new BehaviorSubject<TypeInvoices[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: TypeInvoices;
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService) {
    super();
  }
  get data(): TypeInvoices[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */


  // consomation api list roles
  getAllTypeInvoicess(): void {
    const paylaod = {  }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/expense-types/all`, paylaod).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.data); 
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  } 
  // consomation api delete roles
  deleteTypeInvoices(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/expense-types/${id}`)
       .subscribe({
          next: (data) => { },
          error: (error) => {
            console.log(error);
          },
      });
  }

}
