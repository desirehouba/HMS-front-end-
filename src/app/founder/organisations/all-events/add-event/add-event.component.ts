import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent {
  eventForm: UntypedFormGroup;
  loading = false; 

  breadscrums = [
    {
      title: 'Add Event',
      items: ['Event'],
      active: 'Add Event',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private router : Router,
    public translateService: TranslateService,
    public servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      type: ['', [Validators.required]], 
      budget: [''], 
    });
  }

  get f() {
    return this.eventForm.controls;
  }

  ngOnInit(): void { 
  }

  cancel() {
    this.router.navigate([
      "/founder/organisations/all-events"
    ]);
  }

  // consommation de api de creation d'un privilige
  addEvent() {
    // stockage des données du formulaire dans un objet
    // de type event qui sera envoyé a api
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
    this.loading = true;
    
    this.servicesService.addObjets(
      this.servicesService.route.events[0],
      eventData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.cancel();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
