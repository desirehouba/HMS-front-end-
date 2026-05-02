import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Departements } from 'src/app/core/models/departements.model';
@Injectable()
export class DepartementsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/departements.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Departements[]> = new BehaviorSubject<Departements[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Departements;
  constructor(
    private httpClient: HttpClient,
    private router : Router) {
    super();
  }
  get data(): Departements[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getAllHotelss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/schoolsall`, paylaod);
  }

  getPrinciapalss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users`, paylaod);
  }

  // consomation api list roles
  getAllDepartementss(): void {
    const paylaod = {
      page_items:1,
      nbre_items:10,
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/services/all`, paylaod).subscribe({
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
  addDepartements(departements: any): void {
    this.dialogData = departements;
    this.httpClient.post<any>(
      `${environment.apiUrl}/services`, departements)
       .subscribe({
          next: (data) => {
            console.log("c'est bon");
            
            console.log(data);
            this.dialogData = departements;
            this.router.navigate(
              ["/admin/departements/all-departements"]
            );
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  // consomation api update roles
  updateDepartements(id: number, datas : any, ): void {
    this.httpClient.put<any>(
      `${environment.apiUrl}/services/${id}`, datas)
       .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
      });
  }
  
  // consomation api delete roles
  deleteDepartements(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/services/${id}`)
       .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

}
