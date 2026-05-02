import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { FeesService } from './fees.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DeleteFeeDialogComponent } from './delete/delete.component';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
import { Router } from '@angular/router';
import { FeesService } from './fees.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Fees } from 'src/app/core/models/feestransactions.model';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AboutFeeComponent } from './about-fee/about-fee.component';
import { formatDate } from '@angular/common';
import { AboutFeesComponent } from './about-fees/about-fees.component';
/* import { formatDate } from '@angular/common'; */

@Component({
  selector: 'app-all-fees',
  templateUrl: './all-fees.component.html',
  styleUrls: ['./all-fees.component.scss'],
})
export class AllFeesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'student.name',
    'student',
    'fee',
    'advancePayment',
    'balancePayment',
    'payment_mode',
    'created_at',
    'actions',
  ];
  exampleDatabase?: FeesService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Fees>(true, []);
  id?: number;
  fees?: Fees;
  classrooms: any[] = [];
  sommes: any = 0;
  xfoms: any = 0;
  xfmomos: any = 0;
  cash: any = 0;
  bank: any = 0;
  s: boolean = false;
  loading = false;
  ecole!: any
  transForms: UntypedFormGroup;
  permissions!: any[];
  valueFilter: any = null;
  breadscrums = [
    {
      title: 'All Fees',
      items: ['Fees'],
      active: 'All Fees',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public feesService: FeesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService : AuthService,
    public translateService : TranslateService,
    public servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    super();

    this.transForms = this.fb.group({
      classroom: [""],
      date_start: ["", [Validators.required]],
      date_end: ["", [Validators.required]],
    });
    
    this.sommes = localStorage.getItem('xf')
    this.xfoms = localStorage.getItem('xfoms')
    this.cash = localStorage.getItem('xfcash')
    this.bank = localStorage.getItem('xfbank')
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
    this.setDate(false);
    this.permissions = this.authService.currentUserValue.permissions
    this.ecole = localStorage.getItem("rtr");
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    this.router.navigate([
      "/founder/transactions/all-transactions/add-transaction"
    ]);
  }

  ss() {
    this.sommes = localStorage.getItem('xf');
    this.xfoms = localStorage.getItem('xfoms');
    this.cash = localStorage.getItem('xfcash');
    this.bank = localStorage.getItem('xfbank');
    this.s = true
  }

  setDate(i: boolean) {
    if (i === true) {
      localStorage.setItem('date_start', formatDate(this.transForms.controls['date_start'].value,'dd-MM-YYYY', 'en-US'));
      localStorage.setItem('date_end', formatDate(this.transForms.controls['date_end'].value,'dd-MM-YYYY', 'en-US'));
    } else {
      localStorage.setItem('date_start', '');
      localStorage.setItem('date_end', '');
    }
    this.loadData();
  }

  deleteItem(row: Fees) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteFeeDialogComponent, {
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
          this.showNotification(
            'snackbar-danger',
            'Delete Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }

  About(row: Fees) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutFeeComponent, {
      data: { feesUsers: row },
      direction: tempDirection,
    });
  }

  AboutAll() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutFeesComponent, {
      data: { feesUsers: this.selection.selected },
      direction: tempDirection,
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
  public loadData() {
    this.s = false
    this.exampleDatabase = new FeesService(
      this.httpClient, this.authService );
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
    // key libelle with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.renderedData.map((x) => ({
        Student: x.student.name,
        Frais : x.fee.name,
        Amount: x.advancePayment,
        Payment_mode : x.payment_mode,
        Date: x.created_at,
      }));

    TableExportUtil.exportToExcel(exportData,
      'Liste des Transactions des Frais Annexes');
  }

  exportPDFBackend() {
    this.valueFilter = this.filter.nativeElement.value
    const payload = {
      filter_value: this.valueFilter,
      idSchool : this.authService.currentUserValue.idSchool,
      idSection: this.authService.currentUserValue.idSection,
      date_start: localStorage.getItem('date_start'),
      date_end: localStorage.getItem('date_end'),
    };
    this.loading = true; 
    this.servicesService.addObjets(
      this.servicesService.route.listsPDF[3], payload
    ).subscribe({
      next: (data) => {
        this.loading = false;
        open(data.data);
      },
      error: (error) => {
        this.loading = false; 
        if (error.message) {
          this.servicesService.showCustomPositionEchec(error.message);
        } else {
          this.servicesService.showCustomPositionEchec(error);
        }
      }, 
    });
    
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
  onContextMenu(event: MouseEvent, item: Fees) {
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
export class ExampleDataSource extends DataSource<Fees> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Fees[] = [];
  renderedData: Fees[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: FeesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  connect(data: any): Observable<Fees[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllFeess(data, this.paginator.pageIndex, this.paginator.pageSize);
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