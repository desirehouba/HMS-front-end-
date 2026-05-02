import { Component } from '@angular/core';
import {UntypedFormBuilder,
  UntypedFormGroup,Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss'],
})
export class AddHolidayComponent {
  holidayForm: UntypedFormGroup;
  users: any[] = [];
  loading = false;
  user =  false;
  staff = false
  staffs: any[] = [];
  breadscrums = [
    {
      title: 'Add Holiday',
      items: ['Holiday'],
      active: 'Add Holiday',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private router : Router,
    public translateService : TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    this.holidayForm = this.fb.group({
      days_taken: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      idUserApprove: ['', [Validators.required]],
      reason: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getStaffss();
  }

  getStaffss() {
    this.staff = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      role_id : 3,
      role_type: ["Staffs", "Direction"],
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.staff = false
        this.staffs = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.staffs = this.staffs.sort(SortArray);
      },
    });
  }

  get f() {
    return this.holidayForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/human-resources/all-holidays"]
    );
  }

  // consommation de api de creation d'un privilige
  addHoliday() {
    // stockage des données du formulaire dans un objet
    // de type holiday qui sera envoyé a api
    
    const holidayData = {
      idUserApprove: this.f['idUserApprove'].value,
      reason: this.f['reason'].value,
      type: this.f['type'].value,
      days_taken: this.f['days_taken'].value,
      start_date: formatDate(this.f['start_date'].value, 'YYYY-MM-dd', 'en-US'),
      end_date: formatDate(this.f['end_date'].value,'YYYY-MM-dd', 'en-US'),
    };
    this.loading = true;
    let holidayDatas = { holidays: [holidayData] };
    this.servicesService.addObjets(
      this.servicesService.route.holidays[0],
      holidayData
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
