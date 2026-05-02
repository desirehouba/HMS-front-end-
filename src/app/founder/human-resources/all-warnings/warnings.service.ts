import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Warnings } from 'src/app/core/models/warnings.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class WarningsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/warnings.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Warnings[]> = new BehaviorSubject<Warnings[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paylaod: any = {};
  dialogData!: Warnings;
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService 
  ) {
    super();
  }
  get data(): Warnings[] {
    return this.dataChange.value;
  }
  get meta(): any {
    return this.metaChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  // consomation api list roles
  getAllWarningss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    this.paylaod = {
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/warningsall`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          console.log(data);
          this.metaChange.next(data.meta);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  
  // consomation api delete roles
  deleteWarnings(id: number): void {
    console.log(id);
    this.httpClient.delete<any>(
      `${environment.apiUrl}/warnings/${id}`)
       .subscribe({
          next: (data) => {
            console.log(data);
            console.log("passé");
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

}
