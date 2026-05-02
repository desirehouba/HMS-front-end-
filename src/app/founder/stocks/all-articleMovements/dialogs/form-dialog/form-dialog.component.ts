import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { OrdersService } from '../../articleMovements.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Orders } from 'src/app/core/models/orders.model';
import { AuthService } from 'src/app/core/service/auth.service';
;
import { MatListOption } from '@angular/material/list';
import { ServicesService } from 'src/app/core/service/services.service';

export interface DialogData {
  id: number;
  action: string;
  orders: Orders;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class OrdersDialogComponent {
  dialogTitle: string;
  orderForm: UntypedFormGroup;
  orders: Orders;
  levels: any[] = [];
  optionany: Optionlevels[] = [];

  levelsControl = new UntypedFormControl();
  optionLevel: any;
  filteredany!: any[];
  selectPrivilege: any;
  stat!: boolean;
  loading = false;
  opt = false
  scholar_level!: String;
  idOptionlevel !: any

  selectionChangeany(options: MatListOption[]) {
    const optionStudent = options[0];
    let value = this.levelsControl.value || [];
    if (optionStudent.selected) value.push(optionStudent.value);
    else value = value.filter((x: any) => x != optionStudent.value);
    this.levelsControl.setValue(value);
  }

  onInputChange(event: any) {
    let i: number
    const searchInput = event.target.value.toLowerCase();
    this.filteredany = this.levels.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }
  constructor(
    public dialogRef: MatDialogRef<OrdersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ordersService: OrdersService,
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private servicesService : ServicesService
  ) {
    this.dialogTitle = data.orders.name;
    this.orders = data.orders;
    
    this.orderForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.orders.id],
      name: [this.orders.name],
      description: [this.orders.description],
      level: [this.orders.levels],
      libelle: [this.orders.libelle],
      code: [this.orders.code],
      assessment: [this.orders.assessment],
      optionLevel: [this.idOptionlevel],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAssessment(){
    if (
      this.orderForm.get("assessment")?.value === true
    ) {
      this.stat = true;
    } else{
      this.stat = false;
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('section') === 'Bilingue') {
      this.getOptionlevelss();
    }
    this.getAssessment();
    this.getanys();
    this.scholar_level = this.authService.currentUserValue.scholar_level
  }

   // methode pour lister les permissions
  getanys() {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.levels[1], paylaod
    ).subscribe({
      next: (res) => {
        this.levels = res.data;
        this.filteredany = res.data;
        this.levelsControl.setValue(
          this.orders.levels
        );
      },
    });
  }

  getOptionlevelss() {
    this.opt =  true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.optionlevels[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.optionany = res.data;
        this.opt = false
      },
      error: (error) => {
        this.opt = false; 
      },
    });
  }

  get f() {
    return this.orderForm.controls;
  }

  // consommation de api de creation d'un privilige
  updateOrders() {

    this.loading = true;
    const orderData = {
      idOptionLevel : this.f['optionLevel'].value,
      name: this.f['name'].value,
      description: this.f['description'].value,
      levels: this.levelsControl.value,
      code: this.f['code'].value,
      libelle: this.f['libelle'].value,
      assessment: this.f['assessment'].value,
      idSchool : this.orders.idSchool,
      idSection : this.orders.idSection,
    };
    console.log(orderData);
    
    
    this.servicesService.updateObjets(
      this.servicesService.route.orders[0],
      this.orders.id, orderData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec('une erreur est survenu');
      },
    });
  }
    
}
