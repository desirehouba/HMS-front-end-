import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl,
  UntypedFormGroup, Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-noteFrais',
  templateUrl: './add-noteFrais.component.html',
  styleUrls: ['./add-noteFrais.component.scss'],
})
export class AddNoteFraiComponent {
  noteFraisForm: UntypedFormGroup;
  loading = false;
  staff = false
  staffs: any[] = [];
  breadscrums = [
    {
      title: 'Add Note Frais',
      items: ['note Frais'],
      active: 'Add note Frais',
    },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private router : Router,
    private servicesService : ServicesService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.noteFraisForm = this.fb.group({
      status: [''],
      date: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      idUserApprove: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getStaffss();
  }
   // methode pour lister les permissions

  get f() {
    return this.noteFraisForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/human-resources/all-notes-frais"]
    );
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


  // consommation de api de creation d'un privilige
  addNoteFrais() {
    // stockage des données du formulaire dans un objet
    // de type noteFrai qui sera envoyé a api
    const noteFraiData = {
      amount: this.f['amount'].value,
      date: formatDate(this.f['date'].value,'dd-MM-YYYY', 'en-US'),
      libelle: this.f['libelle'].value,
      description: this.f['description'].value,
      idUserApprove: this.f['idUserApprove'].value,
      idUser: this.authService.currentUserValue.id,
    };
    this.loading = true;
    let noteFraiDatas = { note_frais: [noteFraiData] };
    // api de creation d'un noteFrai 
    this.servicesService.addObjets(
      this.servicesService.route.notefrais[0], noteFraiDatas
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
        this.cancel();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }
}
