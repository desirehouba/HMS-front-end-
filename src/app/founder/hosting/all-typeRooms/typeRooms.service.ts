import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeRooms } from 'src/app/core/models/typeRooms.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class TypeRoomsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/typeRooms.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<TypeRooms[]> = new BehaviorSubject<TypeRooms[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: TypeRooms;
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService) {
    super();
  }
  get data(): TypeRooms[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */


  // consomation api list roles
  getAllTypeRoomss(): void {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/room-types/all`, paylaod).subscribe({
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
  addTypeRooms(typeRooms: any): void {
    this.dialogData = typeRooms;
    this.httpClient.post<any>(
      `${environment.apiUrl}/typeRooms`, typeRooms)
       .subscribe({
          next: (data) => {
            this.router.navigate(
              ["/founder/typeRooms/all-typeRooms"]
            );
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  // consomation api update roles
  updateTypeRooms(id: number, datas : any, ): void {
    this.httpClient.put<any>(
      `${environment.apiUrl}/typeRooms/${id}`, datas)
       .subscribe({
          next: (data) => { },
          error: (error) => {
            console.log(error);
          },
      });
  }
  
  // consomation api delete roles
  deleteTypeRooms(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/typeRooms/${id}`)
       .subscribe({
          next: (data) => { },
          error: (error) => {
            console.log(error);
          },
      });
  }

}
