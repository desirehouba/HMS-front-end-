import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-add-stat',
  templateUrl: './add-stat.component.html',
  styleUrls: ['./add-stat.component.scss'],
})
export class AddStatComponent {
  statForm: UntypedFormGroup;
  status!: number;
  loading = false;
  loadingExpense = false;
  loading2= false;
  finances: any;
  finances2: any;
  expenses: any;

  school!: any;
  statistique: any[] = [
    {
      id: 1,
      name: 'Statistique des entrés',
      title : 'Montant encaissé'
    },/* 
    {
      id: 2,
      name: 'Statistique des entrés Frais',
    }, */
    {
      id: 3,
      name: 'Statistique des dépenses',
      title : 'Montant décaissé'
    },/* 
    {
      id: 4,
      name: 'Statistique total',
    }, */
  ];
  hide = false;
  vide = false;
  statTrue = 1;
  paylaods!: any

  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private router : Router,
    public translateService : TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.statForm = this.fb.group({
      type: [''],
    });
  }
  ngOnInit(): void {
    this.getFinancess();
    this.getExepnsess();
    //this.getExepnsessDetail();
  }

  action(data : any) {
    this.statTrue = data
  }

  getFinancess(): void {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    }

    this.servicesService.addObjets(
      this.servicesService.route.statistiques[0], paylaod
    ).subscribe({
      next: (res) => {
        this.finances = res.data;
        console.log(this.finances);
        
        this.loading = true;
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }

  

  getExepnsess(): void {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    }
    this.servicesService.addObjets(
      this.servicesService.route.statistiques[1], paylaod
    ).subscribe({
      next: (res) => {
        this.expenses = res.data[0];
        console.log(res.data);
        
        this.loadingExpense = true;
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }

  /* getExepnsessDetail(): void {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      //idSection : this.authService.currentUserValue.idSection,
    }

    this.servicesService.addObjets(
      this.servicesService.route.statistiques[2], paylaod
    ).subscribe({
      next: (res) => {
        this.finances2 = res.data[0];
        console.log(res.data);
        
        this.loading2 = true;
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  } */

  get f() {
    return this.statForm.controls;
  }

}
