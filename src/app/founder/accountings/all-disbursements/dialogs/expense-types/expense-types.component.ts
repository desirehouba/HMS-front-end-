import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core'; 
import { UntypedFormControl, Validators,
  UntypedFormGroup, UntypedFormBuilder,
} from '@angular/forms';
import { ServicesService } from 'src/app/core/service/services.service'; 
import { ExpenseTypes } from 'src/app/core/models/expenseTypes.model';

export interface DialogData {
  id: number;
  action: string;
  expenseTypes: ExpenseTypes;
}

@Component({
  selector: 'app-expense-types',
  templateUrl: './expense-types.component.html',
  styleUrls: ['./expense-types.component.scss'],
})
export class ExpenseTypesComponent {
  action: string;
  dialogTitle: string;
  expenseTypesForm: UntypedFormGroup;
  expenseType: ExpenseTypes;
  expenseTypes: ExpenseTypes[] = [];
  hide = false;
  loading = false;
  isexpenseType = true;
  typeinv!: any;

  constructor(
    public dialogRef: MatDialogRef<ExpenseTypesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private fb: UntypedFormBuilder,
    private servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.expenseTypes.name;
      this.expenseType = data.expenseTypes;
    } else {
      this.dialogTitle = 'app.expenseType';
      const blankObject = {} as ExpenseTypes;
      this.expenseType = new ExpenseTypes(blankObject);
    }
    this.expenseTypesForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    if (this.hide != true) {
      return this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        description: ['' ],
      });
    } else {
      return this.fb.group({
        id: [this.expenseType.id],
        name: [this.expenseType.name],
        description: [this.expenseType.description],
      });
    }
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.getExpenseTypess();
  }

  typeClick(type: any) {
    this.typeinv = type;
    this.hide = true
  }

  getExpenseTypess() {
    const paylaod = {}
    this.servicesService.getObjetss(
      this.servicesService.route.expenseTypes[1], paylaod
    ).subscribe({
      next: (res) => {
        this.expenseTypes = res.data;
        this.isexpenseType = false;
      },
      error: (error) => {
        this.isexpenseType = false;
      }, 
    });
  }

  get f() {
    return this.expenseTypesForm.controls;
  }

  // consommation de api de update de user 

  expenseTypesActions() {
    this.loading = true;

    if (this.action != 'edit') {
      const expenseTypesData = {
        name: this.f['name'].value,
      };
      
      this.servicesService.addObjets(
        this.servicesService.route.expenseTypes[0], expenseTypesData
      ).subscribe({
        next: (data) => {
          this.getExpenseTypess();
          this.loading = false;
          this.servicesService.showCustomPosition();
          this.expenseTypesForm.reset();
        },
        error: (error) => {
          this.loading = false; 
          this.servicesService.showCustomPositionEchec(error);
        },
      });
    } else {
      const expenseTypesData = {
        name: this.f['name'].value,
        description: this.f['description'].value,
      };
      this.servicesService.updateObjets(
        this.servicesService.route.expenseTypes[0],
        this.expenseType.id, expenseTypesData
      ).subscribe({
        next: (data) => {
          this.getExpenseTypess();
          this.expenseTypesForm.reset();
          this.loading = false;
          this.servicesService.showCustomPosition();
        },
        error: (error) => {
          this.loading = false; 
          this.servicesService.showCustomPositionEchec(error);
        },
      });
    }
  }
}
