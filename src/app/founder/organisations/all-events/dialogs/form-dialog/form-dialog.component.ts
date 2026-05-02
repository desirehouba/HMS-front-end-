import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EventsService } from '../../events.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Events } from 'src/app/core/models/events.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
import { MatListOption } from '@angular/material/list';
import { AuthService } from 'src/app/core/service/auth.service';

;

export interface DialogData {
  id: number;
  action: string;
  events: Events;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class EventFormDialogComponent {
  dialogTitle: string;
  eventForm: UntypedFormGroup;
  events: Events;
  loading = false 
  constructor(
    public dialogRef: MatDialogRef<EventFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public eventsService: EventsService,
    private fb: UntypedFormBuilder,
    public servicesService: ServicesService, 
    private authService : AuthService,
  ) {
    this.dialogTitle = data.events.name;
    this.events = data.events;
    this.eventForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.events.id],
      name: [this.events.name], 
      description: [this.events.description], 
      start_date: [this.events.start_date], 
      end_date: [this.events.end_date], 
      type: [this.events.type],  
      budget: [this.events.budget], 
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void { 
  }

  get f() {
    return this.eventForm.controls;
  }

  // consommation de api de creation d'un privilige
  updateEvents() {
    // stockage des données du formulaire dans un objet
    // de type event qui sera envoyé a api
    this.loading = true
    const eventData = {
      name: this.f['name'].value,
      type: this.f['type'].value,
      budget: this.f['budget'].value,
      description: this.f['description'].value,
      start_date: formatDate(this.f['start_date'].value,'YYYY-MM-dd', 'en-US'),
      end_date: formatDate(this.f['end_date'].value,'YYYY-MM-dd', 'en-US'), 
      service_id : this.authService.currentUserValue.service_id,
      hotel_id : this.authService.currentUserValue.hotel_id,
    };
    
    this.servicesService.updateObjets(
      this.servicesService.route.events[0],
      this.events.id, eventData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
