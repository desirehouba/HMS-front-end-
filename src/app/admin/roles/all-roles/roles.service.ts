import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Roles } from 'src/app/core/models/roles.model';
@Injectable()
export class RolesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/roles.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Roles[]> = 
    new BehaviorSubject<Roles[]>([]);
  dialogData!: Roles;
  constructor(
    private httpClient: HttpClient,
    private router : Router) {
    super();
  }
  get data(): Roles[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  
  getPermissions() {
    const paylaod = {
      filter_value: '',
      page_items: 1,
      nbre_items: 1
    }
    return this.httpClient.post<any>(
      `${environment.apiUrl}/permissions/all`, paylaod);
  }

  getSchoolss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/schoolsall`, paylaod);
  }

  getSectionss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/secionsall`, paylaod);
  }

  // consomation api list roles
  getAllRoless(): void {
    const paylaod = {
      filter_value: '',
      page_items: 1,
      nbre_items: 1
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/roles/all`, paylaod).subscribe({
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

  // consomation api add roles
  addRoles(roles: any): void {
    this.dialogData = roles;
    this.httpClient.post<any>(
      `${environment.apiUrl}/roles`, roles)
       .subscribe({
          next: (data) => {
            console.log(data);
            this.dialogData = roles;
            this.router.navigate(
              ["/admin/roles/all-roles"]
            );
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  // consomation api update roles
  updateRoles(id: number, datas : any, ): void {
    console.log(datas);
    console.log(id);
    this.httpClient.put<any>(
      `${environment.apiUrl}/roles/${id}`, datas)
       .subscribe({
          next: (data) => {
          },
          error: (error) => {
            console.log(error);
          },
      });
  }
  
  // consomation api delete roles
  deleteRoles(id: number): void {
    console.log(id);
    this.httpClient.delete<any>(
      `${environment.apiUrl}/roles/${id}`)
       .subscribe({
          next: (data) => {
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  
}
