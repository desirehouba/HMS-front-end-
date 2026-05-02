import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tasks } from 'src/app/core/models/tasks.mode';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class TasksService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/tasks.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Tasks[]> = new BehaviorSubject<Tasks[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paylaod: any = {};
  dialogData!: Tasks;
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
  get data(): Tasks[] {
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
  getAllTaskss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    if (localStorage.getItem('due_dateTasks') ) {
      this.due_date = JSON.parse(localStorage.getItem('due_dateTasks') || '')
    }
    if (localStorage.getItem('priorityTasks')) {
      this.priority = JSON.parse(localStorage.getItem('priorityTasks') || '')
    }
    if (localStorage.getItem('idUserTasks') ) {
      this.idUser = JSON.parse(localStorage.getItem('idUserTasks') || '')
    }
    if (localStorage.getItem('statusTasks')) {
      this.status = JSON.parse(localStorage.getItem('statusTasks') || '')
    }
    this.paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      filter_value: data,/* 
      due_date: this.due_date, */
      priority: this.priority,
      status: this.status,
      user_id: this.idUser,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/tasks/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          console.log(data);
          this.metaChange.next(data.meta);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  // consomation api delete roles
  deleteTasks(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/tasks/${id}`)
       .subscribe({
          next: (data) => {},
          error: (error) => {
            console.log(error);
          },
      });
  }

}
