import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContractsService } from './contracts.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Contracts } from 'src/app/core/models/contracts.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractsFormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { AboutContractsComponent } from './dialogs/about-contracts/about-contracts.component';
import { ContractsDeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
/* import { formatDate } from '@angular/common'; */

@Component({
  selector: 'app-all-contracts',
  templateUrl: './all-contracts.component.html',
  styleUrls: ['./all-contracts.component.scss'],
})
export class AllContractsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'user',
    'position',
    'type',
    'start_date',
    'status',
    'actions',
  ];
  contractsForms: UntypedFormGroup;
  exampleDatabase?: ContractsService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Contracts>(true, []);
  id?: number;
  contracts?: Contracts;
  valueFilter: any = null;
  privileges!: any[]
  due_date!: any
  priority!: any
  status!: any
  idUser!: any
  breadscrums = [
    {
      title: 'All Contract',
      items: ['Contract'],
      active: 'All Contract',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public contractsService: ContractsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService : AuthService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    super();
    if (localStorage.getItem('due_dateContracts') ) {
      this.due_date = JSON.parse(localStorage.getItem('due_dateContracts') || '')
    }
    if (localStorage.getItem('priorityContracts')) {
      this.priority = JSON.parse(localStorage.getItem('priorityContracts') || '')
    }
    if (localStorage.getItem('idUserContracts')) {
      this.idUser = JSON.parse(localStorage.getItem('idUserContracts') || '')
    }
    if (localStorage.getItem('statusContracts')) {
      this.status = JSON.parse(localStorage.getItem('statusContracts') || '')
    }

    this.contractsForms = this.fb.group({
      idUser: [this.idUser],
      due_date: [this.due_date],
      priority: [this.priority],
      status: [this.status],
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
    this.privileges = this.authService.currentUserValue.permissions
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    this.router.navigate([
      "/founder/human-resources/all-contracts/add-contract"
    ]);
  }

  get f() {
    return this.contractsForms.controls;
  }

  setUser() {
    if (this.f["idUser"].value != null) {
      localStorage.setItem('idUserContracts', JSON.stringify(this.f["idUser"].value));
    } else {
      localStorage.setItem('idUserContracts', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setStatus() {
    if (this.f["status"].value != null) {
      localStorage.setItem('statusContracts', JSON.stringify(this.f["status"].value));
    } else {
      localStorage.setItem('statusContracts', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setPriority() {
    if (this.f["priority"].value != null) {
      localStorage.setItem('priorityContracts', JSON.stringify(this.f["priority"].value));
    } else {
      localStorage.setItem('priorityContracts', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setDate() {
    if (this.f["due_date"].value != null) {
      localStorage.setItem('due_dateContracts', JSON.stringify(this.f["due_date"].value));
    } else {
      localStorage.setItem('due_dateContracts', JSON.stringify(null));
    }
    this.ngOnInit();
  }


  editCall(row: Contracts) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ContractsFormDialogComponent, {
      data: {
        contracts: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.contractsService.getDialogData();
          // And lastly refresh table
          //this.refreshTable();
          this.ngOnInit();
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }
  About(row: Contracts) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutContractsComponent, {
      data: { contracts: row},
      direction: tempDirection,
    });
  }
  deleteItem(row: Contracts) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ContractsDeleteDialogComponent, {
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
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Contracts>(true, []);
    });
    for( let i of this.selection.selected){
      this.contractsService.deleteContracts(i.id);
      this.ngOnInit();
      this.refreshTable();
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
    this.exampleDatabase = new ContractsService(
      this.httpClient, this.router, this.authService
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
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.renderedData.map((x) => ({
        Name: x.description,/* 
        Priority: x.priority, 
        User: x.User.name,
        description: x.description,
        status: x.status */
        //StartDate: x.startDate,
        //EndDate: x.endDate,
        /* 'Joining Date': formatDate(new Date(x.date), 'yyyy-MM-dd', 'en') || '', */
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
  onContextMenu(event: MouseEvent, item: Contracts) {
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
export class ExampleDataSource extends DataSource<Contracts> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Contracts[] = [];
  renderedData: Contracts[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: ContractsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<Contracts[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllContractss(data, this.paginator.pageIndex, this.paginator.pageSize);
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
