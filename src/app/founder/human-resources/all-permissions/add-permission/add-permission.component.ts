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
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss'],
})
export class AddPermissionComponent {
  permissionForm: UntypedFormGroup;
  users: any[] = [];
  loading = false;
  user =  false;
  staff = false
  staffs: any[] = [];
  breadscrums = [
    {
      title: 'Add Permission',
      items: ['Permission'],
      active: 'Add Permission',
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
    this.permissionForm = this.fb.group({
      raison: ['', [Validators.required]],
      dateDepart: ['', [Validators.required]],
      dateRetour: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      idUserApprove: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getStaffss();
  }

  get f() {
    return this.permissionForm.controls;
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

  cancel() {
    this.router.navigate(
      ["/founder/human-resources/all-permissions"]
    );
  }

  // consommation de api de creation d'un privilige
  addPermission() {
    // stockage des données du formulaire dans un objet
    // de type permission qui sera envoyé a api
    
    const permissionData = {
      raison: this.f['raison'].value,
      duration: this.f['duration'].value,
      dateDepart: formatDate(this.f['dateDepart'].value, 'dd-MM-YYYY', 'en-US'),
      dateRetour: formatDate(this.f['dateRetour'].value,'dd-MM-YYYY', 'en-US'),
      idUserApprove: this.f['idUserApprove'].value,
    };
    this.loading = true;
    let permissionDatas = { permissions: [permissionData] };
    this.servicesService.addObjets(
      this.servicesService.route.permissions[0],
      permissionData
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
