import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Hotels } from '../core/models/hotels.model';
@Injectable()
export class AccountService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/hotels.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Hotels[]> = new BehaviorSubject<Hotels[]>([]);
  dialogData!: Hotels;
  Etablis!: Hotels
  constructor(  ) {
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

}
