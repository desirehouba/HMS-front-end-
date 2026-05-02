import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Permissions } from 'src/app/core/models/permissions.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class PermissionsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/permissions.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Permissions[]> = new BehaviorSubject<Permissions[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paylaod: any = {};
  dialogData!: Permissions;
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
  get data(): Permissions[] {
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
  getAllPermissionss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    if (localStorage.getItem('due_datePermissions') ) {
      this.due_date = JSON.parse(localStorage.getItem('due_datePermissions') || '')
    }
    if (localStorage.getItem('priorityPermissions')) {
      this.priority = JSON.parse(localStorage.getItem('priorityPermissions') || '')
    }
    if (localStorage.getItem('idUserPermissions') ) {
      this.idUser = JSON.parse(localStorage.getItem('idUserPermissions') || '')
    }
    if (localStorage.getItem('statusPermissions')) {
      this.status = JSON.parse(localStorage.getItem('statusPermissions') || '')
    }
    this.paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      filter_value: data,
      due_date: this.due_date,
      priority: this.priority,
      status: this.status,
      idUser: this.idUser,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/permission-requests/all`, this.paylaod)
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
  deletePermissions(id: number): void {
    this.httpClient.delete<any>(
      `${environment.apiUrl}/permissions/${id}`)
       .subscribe({
          next: (data) => {},
          error: (error) => {
            console.log(error);
          },
      });
  }

}
