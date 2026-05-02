import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DisbursementsService } from './disbursements.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Disbursements } from 'src/app/core/models/disbursements.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';/* 
import { DisbursementsDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DisbursementsDeleteDialogComponent } from './dialogs/delete/delete.component'; */
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AboutDisbursementComponent } from './dialogs/about-disbursement/about-disbursement.component';  
import { ExpenseTypesComponent } from './dialogs/expense-types/expense-types.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-all-disbursements',
  templateUrl: './all-disbursements.component.html',
  styleUrls: ['./all-disbursements.component.scss'],
})
export class AllDisbursementsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'service',
    'expense_type_id',
    'creator',
    'total_amount',
    //'payment_method',
    'disbursement_date',
    'status',
    'actions',
  ];
  exampleDatabase?: DisbursementsService;
  disbursementForm: UntypedFormGroup;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Disbursements>(true, []);
  id?: number;
  disbursements?: Disbursements;
  valueFilter: any = null;
  isexpenseType = false; 
  loading= false; 
  user= false; 
  permissions!: any []
  services : any [] = [];
  expenseTypes : any [] = [];
  typeDisbursement!: any
  users : any [] = [];
  statusDisbursement!: any
  breadscrums = [
    {
      title: 'All Disbursement',
      items: ['Disbursement'],
      active: 'All Disbursement',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public disbursementsService: DisbursementsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService ,
    public translateService: TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    super();

    this.disbursementForm = this.fb.group({
      typeDisbursement: [localStorage.getItem('typeDisbursement') ? JSON.parse(localStorage.getItem('typeDisbursement') || '') : ''],
      service: [localStorage.getItem('serviceDisbursement') ? JSON.parse(localStorage.getItem('serviceDisbursement') || '') : ''],
      supplier_id: [localStorage.getItem('supplierDisbursement') ? JSON.parse(localStorage.getItem('supplierDisbursement') || '') : ''],
      status: [localStorage.getItem('statusDisbursement') ? JSON.parse(localStorage.getItem('statusDisbursement') || '') : ''],
      responsible_id: [localStorage.getItem('responsibleDisbursement') ? JSON.parse(localStorage.getItem('responsibleDisbursement') || '') : ''],
      
      date_start: ["", [Validators.required]],
      date_end: ["", [Validators.required]],
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
    this.getExpenseTypess();
    this.getServicess();
    this.getUserss();
    this.setDate(false);
    this.permissions = this.authService.currentUserValue.permissions;
  }
  refresh() {
    this.loadData();
  }

  addNew() { 
    this.router.navigate([
      "/founder/accountings/all-disbursements/add-disbursement"
    ]);
  }

  get f() {
    return this.disbursementForm.controls;
  }

  getServicess() {
    const paylaod = { 
      hotel_id : this.authService.currentUserValue.hotel_id
    }
    this.servicesService.getObjetss(
      this.servicesService.route.departements[1], paylaod
    ).subscribe({
      next: (res) => {
        this.services = res.data;
      },
    });
  }

  getExpenseTypess() {
    this.isexpenseType = true; 
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

  setDate(i: boolean) {
    if (i === true) {
      localStorage.setItem('date_start_disbursement', formatDate(this.disbursementForm.controls['date_start'].value,'YYYY-MM-dd', 'en-US'));
      localStorage.setItem('date_end_disbursement', formatDate(this.disbursementForm.controls['date_end'].value,'YYYY-MM-dd', 'en-US'));
    } else {
      localStorage.setItem('date_start_disbursement', '');
      localStorage.setItem('date_end_disbursement', '');
    }
    this.loadData();
  } 
  
  setService() {
    if (this.f["service"].value != null) {
      localStorage.setItem('serviceDisbursement', JSON.stringify(this.f["service"].value));
    } else {
      localStorage.setItem('serviceDisbursement', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setStatus() {
    if (this.f["status"].value != null) {
      localStorage.setItem('statusDisbursement', JSON.stringify(this.f["status"].value));
    } else {
      localStorage.setItem('statusDisbursement', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setSupplier() {
    if (this.f["supplier_id"].value != null) {
      localStorage.setItem('supplierDisbursement', JSON.stringify(this.f["supplier_id"].value));
    } else {
      localStorage.setItem('supplierDisbursement', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setResponsible() {
    if (this.f["responsible_id"].value != null) {
      localStorage.setItem('responsibleDisbursement', JSON.stringify(this.f["responsible_id"].value));
    } else {
      localStorage.setItem('responsibleDisbursement', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setType() {
    if (this.f["typeDisbursement"].value != null) {
      localStorage.setItem('typeDisbursement', JSON.stringify(this.f["typeDisbursement"].value));
    } else {
      localStorage.setItem('typeDisbursement', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  getUserss() {
    this.user = true
    const paylaod = {
      role_types : ["Direction", "Staffs"]
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.users = res.data;
        this.user = false
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.users = this.users.sort(SortArray);
      },
    });
  }


  addTypeInvoice() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ExpenseTypesComponent, {
      data: { action: 'add', },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) { }
    });
  }

  About(row: Disbursements) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutDisbursementComponent, {
      data: { disbursements: row, },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  } 
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    for (let i of this.selection.selected) {
      
      // suppressions des elements
      this.servicesService.deleteObjetsMulti(
        this.servicesService.route.disbursements[0],
        i.id
      ).subscribe({
        next: (data) => {
          this.refreshTable();
        },
      });
      this.selection = new SelectionModel<any>(true, []);
    }
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new DisbursementsService(
      this.httpClient, this.router, this.authService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase, this.paginator, this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      (res: any) => {
        if (!this.dataSource) { return ; }
        if (res.key === "Enter" || res.code === "Enter") {
          this.valueFilter = this.filter.nativeElement.value
          this.dataSource.connect(this.valueFilter);
        }
      }
    );
  }
  filterButton() {
    this.valueFilter = this.filter.nativeElement.value
    this.dataSource.connect(this.valueFilter);
  }
  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.renderedData.map((x) => ({
        Name: x.total_amount,/* 
        Description: x.description, */
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Disbursements) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
export class ExampleDataSource extends DataSource<Disbursements> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Disbursements[] = [];
  renderedData: Disbursements[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: DisbursementsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<Disbursements[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllDisbursementss(data, this.paginator.pageIndex, this.paginator.pageSize);
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.meta = this.exampleDatabase.meta.total
        this.renderedData = this.exampleDatabase.data
        return this.renderedData;
      })
    );
  }
  disconnect() {}
}
