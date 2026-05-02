import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contracts } from 'src/app/core/models/contracts.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class ContractsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/contracts.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Contracts[]> = new BehaviorSubject<Contracts[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paylaod: any = {};
  dialogData!: Contracts;
  due_date!: any
  priority!: any
  status!: any
  idUser!: any
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService 
  ) {
    super();
  }
  get data(): Contracts[] {
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
  getAllContractss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    if (localStorage.getItem('due_dateContracts') ) {
      this.due_date = JSON.parse(localStorage.getItem('due_dateContracts') || '')
    }
    if (localStorage.getItem('priorityContracts')) {
      this.priority = JSON.parse(localStorage.getItem('priorityContracts') || '')
    }
    if (localStorage.getItem('idUserContracts') ) {
      this.idUser = JSON.parse(localStorage.getItem('idUserContracts') || '')
    }
    if (localStorage.getItem('statusContracts')) {
      this.status = JSON.parse(localStorage.getItem('statusContracts') || '')
    }
    this.paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      filter_value: data,
      due_date: this.due_date,
      priority: this.priority,
      status: this.status,
      idUser: this.idUser,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/contracts/all`, this.paylaod)
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

  // consomation api delete roles
  deleteContracts(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/contracts/${id}`)
       .subscribe({
          next: (data) => {},
          error: (error) => {
            console.log(error);
          },
      });
  }

}
