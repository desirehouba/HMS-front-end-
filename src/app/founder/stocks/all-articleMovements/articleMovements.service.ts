import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArticleMovements } from 'src/app/core/models/articleMovements.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
@Injectable()
export class ArticleMovementsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/articleMovements.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<ArticleMovements[]> = new BehaviorSubject<ArticleMovements[]>([]);
  metaChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: ArticleMovements;
  paylaod: any = {};
  operationType!:any
  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService: AuthService
  ) {
    super();
  }
  get data(): ArticleMovements[] {
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
  getAllArticleMovementss(data: any, page_items : number, nbre_items: number) {
    this.isTblLoading = true;
    if (typeof(data) === 'object') {
      data = null
    }
    
    if (localStorage.getItem('operationType') ) {
      this.operationType = JSON.parse(localStorage.getItem('operationType') || '')
    }
    this.paylaod = {
      operation_type : this.operationType,
      filter_value: data,
      page_items: page_items+1,
      nbre_items: nbre_items
    }
    this.subs.sink = this.httpClient.post<any>(
      `${environment.apiUrl}/article-movements/all`, this.paylaod)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          this.metaChange.next(data.meta);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

}
