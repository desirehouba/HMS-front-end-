import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { TransactionsService } from './transactions.service';
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
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
import { Router } from '@angular/router';
import { TransactionsService } from './transactions.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Transactions } from 'src/app/core/models/transactions.model';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AboutRecuComponent } from './dialogs/about-recu/about-recu.component';
import { ArchiveComponent } from './dialogs/archiver/archiver.component';
import { AboutRecusComponent } from './dialogs/about-recus/about-recus.component';
/* import { formatDate } from '@angular/common'; */

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
})
export class AllTransactionsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'student.name',
    'student',
    'tranche',
    'advancePayment',
    'balancePayment',
    'payment_mode',
    'created_at',
    'actions',
  ];
  transForms: UntypedFormGroup;
  exampleDatabase?: TransactionsService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Transactions>(true, []);
  id?: number;
  transactions?: Transactions;
  sommes: any = 0;
  oms: any = 0;
  cash: any = 0;
  ecole!: any;
  bank: any = 0;
  s: boolean = false;
  loading = false;
  valueFilter: any = null;
  scholar_level!:any
  permissions!: any []
  breadscrums = [
    {
      title: 'All Transactions',
      items: ['Transactions'],
      active: 'All Transactions',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public transactionsService: TransactionsService,
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
      date_start: ["", [Validators.required]],
      date_end: ["", [Validators.required]],
    });
    
    this.sommes = localStorage.getItem('x');
    this.oms = localStorage.getItem('xoms');
    this.cash = localStorage.getItem('xcash');
    this.bank = localStorage.getItem('xbank');
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
    this.scholar_level = this.authService.currentUserValue.scholar_level;
    this.ecole = localStorage.getItem("rtr");
  }
  refresh() {
    this.loadData();
  }

  ss() {
    this.sommes = localStorage.getItem('x');
    this.oms = localStorage.getItem('xoms');
    this.cash = localStorage.getItem('xcash');
    this.bank = localStorage.getItem('xbank');
    this.s = true;
  }

  addNew() {
    this.router.navigate(
      ["/founder/transactions/all-transactions/add-transaction"]
    );
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

  About(row: Transactions) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutRecuComponent, {
      data: { transaction: row },
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
    const dialogRef = this.dialog.open(AboutRecusComponent, {
      data: { transaction: this.selection.selected },
      direction: tempDirection,
    });
  }

  ArchiveItem(row: Transactions) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ArchiveComponent, {
      data: { transaction: row },
      direction: tempDirection,
    });
  }

  deleteItem(row: Transactions) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
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
    this.exampleDatabase = new TransactionsService(
      this.httpClient, this.authService
    );
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
    const exportData: Partial<TableElement>[] =
      this.dataSource.renderedData.map((x) => ({
        Eleve: x.student.name,
        Classe: x.student.classe.name,
        Tranche : x.tranche.name,
        Montant: x.advancePayment,
        Reste: x.balancePayment,
        Mode : x.payment_mode,
        Date: x.created_at
      }));
 
    TableExportUtil.exportToExcel(exportData,
      'Liste des Transactions des Frais Annexes ');
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
      this.servicesService.route.listsPDF[2], payload
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

  /* exportPDF() {
    const exportData =
      this.dataSource.renderedData.map((x) => ({
        Eleve: x.student.name,
        Classe: x.student.classe.name,
        Tranche : x.tranche.name,
        Montant: x.advancePayment,
        Reste: x.balancePayment,
        Mode : x.payment_mode,
        Date: x.created_at,
      }));
    const stats = {
      sommes: this.sommes,
      cash: this.cash,
      oms: this.oms,
      bank : this.bank
    }
    TableExportUtil.exportToPDFTransactions(
      exportData, stats,
      'Liste des Transactions de Pension');
  } */

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
  onContextMenu(event: MouseEvent, item: Transactions) {
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
export class ExampleDataSource extends DataSource<Transactions> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Transactions[] = [];
  renderedData: Transactions[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: TransactionsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<Transactions[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange, this.paginator.page,
    ];
    this.exampleDatabase.getAllTransactionss(
      data, this.paginator.pageIndex, this.paginator.pageSize);
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