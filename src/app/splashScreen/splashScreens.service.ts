import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Hotels } from '../core/models/hotels.model';
@Injectable()
export class SplashScreenService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/hotels.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Hotels[]> = new BehaviorSubject<Hotels[]>([]);
  dialogData!: Hotels;
  Etablis!: Hotels
  constructor(
    private httpClient: HttpClient,
    private router : Router
    ) {
    super();
  }

  get data(): Hotels[] {
    return this.dataChange.value;
  }

  get Etabl(): Hotels {
    return this.Etablis;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getAllHotelss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/hotels/sall`, paylaod);
  }


  getAllSectionss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/departements/all`, paylaod);
  }

  getStudentss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users`, paylaod);
  }

}
