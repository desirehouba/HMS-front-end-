import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoomServices } from 'src/app/core/models/roomServices.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class RoomServicesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/roomServices.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<RoomServices[]> = new BehaviorSubject<RoomServices[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: RoomServices;
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService) {
    super();
  }
  get data(): RoomServices[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */


  // consomation api list roles
  getAllRoomServicess(): void {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/room-services/all`, paylaod).subscribe({
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
  addRoomServices(roomServices: any): void {
    this.dialogData = roomServices;
    this.httpClient.post<any>(
      `${environment.apiUrl}/roomServices`, roomServices)
       .subscribe({
          next: (data) => {
            this.router.navigate(
              ["/founder/roomServices/all-roomServices"]
            );
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  // consomation api update roles
  updateRoomServices(id: number, datas : any, ): void {
    this.httpClient.put<any>(
      `${environment.apiUrl}/roomServices/${id}`, datas)
       .subscribe({
          next: (data) => { },
          error: (error) => {
            console.log(error);
          },
      });
  }
  
  // consomation api delete roles
  deleteRoomServices(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/roomServices/${id}`)
       .subscribe({
          next: (data) => { },
          error: (error) => {
            console.log(error);
          },
      });
  }

}
