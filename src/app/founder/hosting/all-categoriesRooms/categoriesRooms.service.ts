import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoriesRooms } from 'src/app/core/models/categoriesRooms.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class CategoriesRoomsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/categoriesRooms.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<CategoriesRooms[]> = new BehaviorSubject<CategoriesRooms[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: CategoriesRooms;
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService) {
    super();
  }
  get data(): CategoriesRooms[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */


  // consomation api list roles
  getAllCategoriesRoomss(): void {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/room-categories/all`, paylaod).subscribe({
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
  addCategoriesRooms(categoriesRooms: any): void {
    this.dialogData = categoriesRooms;
    this.httpClient.post<any>(
      `${environment.apiUrl}/categoriesRooms`, categoriesRooms)
       .subscribe({
          next: (data) => {
            this.router.navigate(
              ["/founder/categoriesRooms/all-categoriesRooms"]
            );
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  // consomation api update roles
  updateCategoriesRooms(id: number, datas : any, ): void {
    this.httpClient.put<any>(
      `${environment.apiUrl}/categoriesRooms/${id}`, datas)
       .subscribe({
          next: (data) => { },
          error: (error) => {
            console.log(error);
          },
      });
  }
  
  // consomation api delete roles
  deleteCategoriesRooms(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/categoriesRooms/${id}`)
       .subscribe({
          next: (data) => { },
          error: (error) => {
            console.log(error);
          },
      });
  }

}
