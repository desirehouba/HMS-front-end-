import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { Privileges } from 'src/app/core/models/privileges.model';
import { ServicesService } from '../../../core/service/services.service';
//const path = environment.apiUrl;

@Injectable()
export class PrivilegesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/privileges.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Privileges[]> = 
    new BehaviorSubject<Privileges[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Privileges;
  constructor(
    private httpClient: HttpClient,
    private router : Router) {
    super();
  }
  get data(): Privileges[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllPrivilegess(): void {

    const paylaod = {
      filter_value: '',
      page_items: 1,
      nbre_items: 1
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/permissions/all`, paylaod).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.data);
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }

  
  addPrivileges(privileges: any): void {
    this.dialogData = privileges;
    this.httpClient.post<any>(
      `${environment.apiUrl}/permissions`, privileges)
       .subscribe({
          next: (data) => {
            console.log(data);
            this.dialogData = privileges;
            this.router.navigate(["/admin/privileges/all-privileges"]);
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  updatePrivileges(id: number, datas : any, ): void {
    console.log(datas);
    console.log(id);
    this.httpClient.put<any>(
      `${environment.apiUrl}/permissions/${id}`, datas)
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
  
  
  deletePrivileges(id: number): void {
    console.log(id);

    this.httpClient.delete<any>(
      `${environment.apiUrl}/permissions/${id}`)
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
