import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Packages } from './packages.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable()
export class PackagesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/packages.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Packages[]> = new BehaviorSubject<Packages[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Packages;
  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    super();
  }
  get data(): Packages[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getHousingCategories() {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/categorielogements`);
  }

  getAllPackagess(): void {
    const paylaod = {
      page_items:1,
      nbre_items:10,
      /*filter_value:, 
      founder_id: ‘integer’,
      manager_id: ‘integer’, */
  
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/packages/all`,paylaod).subscribe({
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

  
  addPackages(packages: any): void {
    this.dialogData = packages;
    this.httpClient.post<any>(
      `${environment.apiUrl}/packages`, packages)
       .subscribe({
          next: (data) => {
            console.log(data);
            this.dialogData = packages;
            this.router.navigate(
              ["/admin/packages/all-packages"]
            );
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  updatePackages(id: number, datas : any, ): void {
    console.log(datas);
    console.log(id);
    this.httpClient.put<any>(
      `${environment.apiUrl}/packages/${id}`, datas)
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
  
  
  deletePackages(id: number): void {
    console.log(id);

    this.httpClient.delete<any>(
      `${environment.apiUrl}/packages/${id}`)
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
