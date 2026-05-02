import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
;

import { Router } from '@angular/router';
import { TransactionsService } from '../all-transactions/transactions.service';
import { TableElement } from 'src/app/shared/TableElement';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { MatListOption } from '@angular/material/list';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-add-insolvent',
  templateUrl: './add-insolvent.component.html',
  styleUrls: ['./add-insolvent.component.scss'],
})
export class AddInsolventComponent {
  insolventForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Insolvent',
      items: ['Insolvent'],
      active: 'Add Insolvent',
    },
  ];
  levels : any[] = [];
  classrooms : any[] = [];
  pensions : any[] = [];
  tranches : any[] = ["1","2","3"];
  status!: number;
  students: any[] = [];
  filteredStudents: any[] = [];
  studentsFeeFeeInsolvable: any[] = [];
  filteredStudentsSovable: any[] = [];
  scholar_levels=['University','CF'] 
  fee!:any
  loading = false;
  loadingSmS = false;
  tranche = false;
  classe = false;
  level = false
  feess = false
  loadingpensioninsolvable = false
  loadingpensionsolvable = false
  loadingFeeinsolvable = false
  loadingFeesolvable = false
  recus: any[] = [];
  fees: any[] = [];
  idSmsPension: any[] = [];
  idSmsFee: any[] = [];
  studentsControl = new UntypedFormControl();
  optionStudent: any;
  totalDejaPaye: any;
  totalDejaPayeSolvable: any;
  montantRestantTranche: any;
  totalDejaPayeFee: any;
  scholar_level : any
  restefeesInsolvable : any
  restefeessolvable : any
  vide = {
    id: null,
    name : 'Vider / Empty' 
  }


  selectionChangeStudents(options: MatListOption[]) {
    const optionStudent = options[0];
    let value = this.studentsControl.value || [];
    if (optionStudent.selected) value.push(optionStudent.value);
    else value = value.filter((x: any) => x != optionStudent.value);
    this.studentsControl.setValue(value);
  }

  onInputChange(event: any) {
    let i: number
    const searchInput = event.target.value.toLowerCase();
    this.filteredStudents = this.students.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }
  constructor(
    private fb: UntypedFormBuilder,
    private insolventsService: TransactionsService,
    private authService : AuthService,
    private router : Router,
    public translateService : TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.insolventForm = this.fb.group({
      classroom: [''],
      classroom1: [''],
      slice: [''],
      level: [''],
      student: [''],
      types : [''],
      Pensiontype: [''],
      Feetype: [''],
      fee: [''],
      message: [''],
    });
  }

  ngOnInit(): void {
    this.getanys();
    this.getAllClassess();
    this.getAllFeess();
    this.scholar_level = this.authService.currentUserValue.scholar_level;
  }

  getAllClassess(): void {
    this.classe = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection
    }
    this.servicesService.getanys(paylaod
    ).subscribe({
      next: (res) => {
        this.classrooms = res.data;
        this.classe = false
        this.classrooms.push(this.vide)
      },
    });
  }

  getanys() {
    this.level = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.levels[1], paylaod
    ).subscribe({
      next: (res) => {
        this.levels = res.data;
        this.level = false
        this.levels.push(this.vide)
      },
    });
  }

  getAllFeess(): void {
    this.studentsFeeFeeInsolvable = []
    this.filteredStudentsSovable = []
    this.fees = []
    this.feess = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idLevel: this.f['level'].value.id,
    } 
    this.servicesService.getFeess(paylaod)
    .subscribe({
      next: (res) => {
        this.fees = res.data;
        this.feess = false
        this.fees.push(this.vide)
      },
    });
  }

  getStudentss() {
    this.loadingpensioninsolvable = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
      nameTranche : this.f['slice'].value,
      idClasse : this.f['classroom'].value.id,
    }
    this.servicesService.addObjets(
      this.servicesService.route.pensionUsersinsolvable[0], paylaod
    ).subscribe({
      next: (res) => {
        this.loadingpensioninsolvable = false
        this.montantRestantTranche = res.montantRestantTranche;
        this.totalDejaPaye = res.totalDejaPaye;
        this.students = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.students = this.students.sort(SortArray);
        if (this.scholar_levels.indexOf(this.scholar_level) != -1){
          for (let student of this.students) {
            this.idSmsPension.push(student.id);
          }
        } else {
          for (let student of this.students) {
            this.idSmsPension.push(student.idParent);
          }
        }
      },
    });
  }

  getStudentsSovable() {
    this.loadingpensionsolvable = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
      nameTranche : this.f['slice'].value,
      idClasse : this.f['classroom'].value.id,
    }
    
   this.servicesService.addObjets(
      this.servicesService.route.pensionUsersinsolvable[1], paylaod
    ).subscribe({
      next: (res) => {
        this.loadingpensionsolvable = false
        this.totalDejaPayeSolvable = res.totalDejaPaye;
        this.filteredStudents = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.filteredStudents = this.filteredStudents.sort(SortArray);
      },
    });
  }

  getStudentssFeeInsolvable() {
    this.loadingFeesolvable = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
      idFee : this.f['fee'].value,
      idClasse : this.f['classroom1'].value.id,
    }
    this.servicesService.addObjets(
      this.servicesService.route.feeUsersinsolvable[0], paylaod
    ).subscribe({
      next: (res) => {
        this.loadingFeesolvable = false
        this.fee = res.data.fee;
        this.restefeesInsolvable = res.montantRestantTranche;
        this.studentsFeeFeeInsolvable = res.data
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.studentsFeeFeeInsolvable = this.studentsFeeFeeInsolvable.sort(SortArray);
        if (this.scholar_levels.indexOf(this.scholar_level) != -1){
          for (let student of this.studentsFeeFeeInsolvable) {
            this.idSmsFee.push(student.id);
          }
        } else {
          for (let student of this.students) {
            this.idSmsFee.push(student.idParent);
          }
        }
      },
    });
  }

  getStudentsFeeSovable() {
    this.loadingFeeinsolvable = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
      idFee : this.f['fee'].value,
      idClasse : this.f['classroom1'].value.id,
    }
    
   this.servicesService.addObjets(
      this.servicesService.route.feeUsersinsolvable[1], paylaod
    ).subscribe({
      next: (res) => {
        this.loadingFeeinsolvable = false
        this.totalDejaPayeFee = res.totalDejaPaye;
        this.filteredStudentsSovable = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.filteredStudentsSovable = this.filteredStudentsSovable.sort(SortArray);
      },
    });
  }

  get f() {
    return this.insolventForm.controls;
  }

  cancel() {
    this.router.navigate([
      "/founder/transactions/all-transactions"
    ]);
  }

  addSms(data : any[]) {
    // stockage des données du formulaire dans un objet
    // de type sms qui sera envoyé a api
    if (data.length === 0){
      this.servicesService.showCustomPositionEchec('Impossible car aucun numero selectionner');
    } else {
      this.loading = true;
      const smsData = {
        message: this.f['message'].value,
        idUsers: data,
      };
      this.loadingSmS = true;
      this.servicesService.addObjets(
        this.servicesService.route.sms[0], smsData
      ).subscribe({
        next: (data) => {
          this.loadingSmS = false;
          this.servicesService.showCustomPosition()
        },
        error: (error) => {
          this.loadingSmS = false; 
          this.servicesService.showCustomPositionEchec(error);
        },
      });
    }
  }

  exportExcel() {
    // key libelle with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.students.map((x) => ({
        Apprenant: x.name,
        Tranche : this.f['slice'].value,
        Versé: x.totalDejaPaye,
        Reste : x.montantRestant
      }));

    TableExportUtil.exportToExcel(
      exportData, 'Liste des Insolvables');
  }

  exportPDF() {
    // key libelle with space add in brackets
    const exportData =
      this.students.map((x) => ({
        Apprenant: x.name,
        Tranche : this.f['slice'].value,
        Versé: x.totalDejaPaye,
        Reste : x.montantRestant
      }));
    TableExportUtil.exportToPDF(exportData,
      'Liste des Insolvables');
  }


  exportExcelSol() {
    // key libelle with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.filteredStudents.map((x) => ({
        Apprenant: x.name,
        Tranche : this.f['slice'].value,
        Versé: x.totalDejaPaye,
      }));

    TableExportUtil.exportToExcel(
      exportData, 'Liste des Solvables');
  }

  exportPDFSolv() {
    // key libelle with space add in brackets
    const exportData =
      this.filteredStudents.map((x) => ({
        Apprenant: x.name,
        Tranche : this.f['slice'].value,
        Versé: x.totalDejaPaye,
      }));
    TableExportUtil.exportToPDF(exportData,
      'Liste des Solvables');
  }


  exportExcelFee() {
    // key libelle with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.studentsFeeFeeInsolvable.map((x) => ({
        Apprenant: x.name,/* 
        Frais : this.fee.name, */
        Versé: x.totalDejaPaye,
        Reste : x.montantRestant
      }));

    TableExportUtil.exportToExcel(
      exportData, 'Liste des Insolvables');
  }

  exportPDFFee() {
    // key libelle with space add in brackets
    const exportData =
      this.studentsFeeFeeInsolvable.map((x) => ({
        Apprenant: x.name,/* 
        Frais : this.fee.name, */
        Versé: x.totalDejaPaye,
        Reste : this.fee.price - x.totalDejaPaye
      }));
    TableExportUtil.exportToPDF(exportData,
      'Liste des Insolvables-'+this.fee.name);
  }


  exportExcelSolFee() {
    // key libelle with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.filteredStudentsSovable.map((x) => ({
        Apprenant: x.name,/* 
        Frais : this.fee.name, */
        Versé: x.totalDejaPaye,
      }));

    TableExportUtil.exportToExcel(
      exportData, 'Liste des Solvables' + 'Frais');
  }

  exportPDFSolvFee() {
    // key libelle with space add in brackets
    const exportData =
      this.filteredStudentsSovable.map((x) => ({
        Apprenant: x.name,/* 
        Frais : this.fee.name, */
        Versé: x.totalDejaPaye,
      }));
    TableExportUtil.exportToPDF(exportData,
      'Liste des Solvables-' + this.fee.name);
  }
}
