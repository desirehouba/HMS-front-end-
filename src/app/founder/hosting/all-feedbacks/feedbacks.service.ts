import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Feedbacks } from 'src/app/core/models/feedbacks.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class FeedbacksService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/feedbacks.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Feedbacks[]> = new BehaviorSubject<Feedbacks[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Feedbacks;
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService : AuthService) {
    super();
  }
  get data(): Feedbacks[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */


  // consomation api list roles
  getAllFeedbackss(): void {
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      service_id : this.authService.currentUserValue.service_id,
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/feedbacks/all`, paylaod).subscribe({
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
  addFeedbacks(feedbacks: any): void {
    this.dialogData = feedbacks;
    this.httpClient.post<any>(
      `${environment.apiUrl}/feedbacks`, feedbacks)
       .subscribe({
          next: (data) => {
            this.router.navigate(
              ["/founder/feedbacks/all-feedbacks"]
            );
          },
          error: (error) => {
            console.log(error);
          },
      });
  }

  // consomation api update roles
  updateFeedbacks(id: number, datas : any, ): void {
    this.httpClient.put<any>(
      `${environment.apiUrl}/feedbacks/${id}`, datas)
       .subscribe({
          next: (data) => { },
          error: (error) => {
            console.log(error);
          },
      });
  }
  
  // consomation api delete roles
  deleteFeedbacks(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/feedbacks/${id}`)
       .subscribe({
          next: (data) => { },
          error: (error) => {
            console.log(error);
          },
      });
  }

}
