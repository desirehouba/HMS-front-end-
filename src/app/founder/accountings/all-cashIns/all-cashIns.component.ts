import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CashInsService } from './cashIns.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CashIns } from 'src/app/core/models/cashIns.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';/* 
import { CashInsDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { CashInsDeleteDialogComponent } from './dialogs/delete/delete.component'; */
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
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AboutCashInComponent } from './dialogs/about-cashIn/about-cashIn.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-all-cashIns',
  templateUrl: './all-cashIns.component.html',
  styleUrls: ['./all-cashIns.component.scss'],
})
export class AllCashInsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'service',
    'seller',
    'room',
    'amount',
    'amount_remaining',
    'payment_method',
    'date',
    'actions',
  ];
  exampleDatabase?: CashInsService;
  cashInForm: UntypedFormGroup;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<CashIns>(true, []);
  id?: number;
  cashIns?: CashIns;
  valueFilter: any = null;
  permissions!: any []
  services : any [] = [];
  users : any [] = [];
  customers: any [] = [];
  typeCashIn!: any
  statusCashIn!: any
  loading = false;
  user = false;
  customer = false;
  breadscrums = [
    {
      title: 'All CashIn',
      items: ['CashIn'],
      active: 'All CashIn',
    },
  ];
  filterUsers!: any[]; 
  onInputChange(event: any) {
    const searchInput = event.target.value.toLowerCase();
    this.filterUsers = this.customers.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  onOpenChange(searchInput: any) {
    searchInput.value = "";
    this.filterUsers = this.customers;
  } 
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public cashInsService: CashInsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService ,
    public translateService: TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    super();

    this.cashInForm = this.fb.group({
      service: [localStorage.getItem('serviceCashIns') ? JSON.parse(localStorage.getItem('serviceCashIns') || '') : ''],
      client: [localStorage.getItem('clientCashIns') ? JSON.parse(localStorage.getItem('clientCashIns') || '') : ''],
      created_by: [localStorage.getItem('createdCashIns') ? JSON.parse(localStorage.getItem('createdCashIns') || '') : ''],
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
    this.getServicess();
    this.getUserss();
    this.getCustomers();
    this.setDate(false);
    this.permissions = this.authService.currentUserValue.permissions;
  }
  refresh() {
    this.loadData();
  }

  addNew() { 
    this.router.navigate([
      "/founder/accountings/all-cashIns/add-cashIn"
    ]);
  }

  get f() {
    return this.cashInForm.controls;
  }

  setDate(i: boolean) {
    if (i === true) {
      localStorage.setItem('date_start', formatDate(this.cashInForm.controls['date_start'].value,'YYYY-MM-dd', 'en-US'));
      localStorage.setItem('date_end', formatDate(this.cashInForm.controls['date_end'].value,'YYYY-MM-dd', 'en-US'));
    } else {
      localStorage.setItem('date_start', '');
      localStorage.setItem('date_end', '');
    }
    this.loadData();
  }

  setStatus() {
    if (this.f["status"].value != null) {
      localStorage.setItem('statusCashIns', JSON.stringify(this.f["status"].value));
    } else {
      localStorage.setItem('statusCashIns', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  
  setCreatetBy() {
    if (this.f["created_by"].value != null) {
      localStorage.setItem('createdCashIns', JSON.stringify(this.f["created_by"].value));
    } else {
      localStorage.setItem('createdCashIns', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setClient() {
    if (this.f["client"].value != null) {
      localStorage.setItem('clientCashIns', JSON.stringify(this.f["client"].value));
    } else {
      localStorage.setItem('clientCashIns', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setService() {
    if (this.f["service"].value != null) {
      localStorage.setItem('serviceCashIns', JSON.stringify(this.f["service"].value));
    } else {
      localStorage.setItem('serviceCashIns', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  getCustomers() {
    this.customer = true;
    const paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id,
      role_id: 5
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.customers = res.data; 
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.customers = this.customers.sort(SortArray);
        this.customer = false;
        this.filterUsers = this.customers.sort(SortArray);
      },
      error: (error) => {
        this.user = false;
      }, 
    });
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

  About(row: CashIns) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutCashInComponent, {
      data: { cashIns: row, },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {});
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
        this.servicesService.route.cashIns[0],
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
    this.exampleDatabase = new CashInsService(
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
        Name: x.order.name,/* 
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
  onContextMenu(event: MouseEvent, item: CashIns) {
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
export class ExampleDataSource extends DataSource<CashIns> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: CashIns[] = [];
  renderedData: CashIns[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: CashInsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<CashIns[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCashInss(data, this.paginator.pageIndex, this.paginator.pageSize);
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
