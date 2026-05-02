import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SmsService } from './sms.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sms } from 'src/app/core/models/sms.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AboutSmsComponent } from './dialogs/about-sms/about-sms.component';
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
  selector: 'app-all-sms',
  templateUrl: './all-sms.component.html',
  styleUrls: ['./all-sms.component.scss'],
})
export class AllSmsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'author',
    'message',
    'created_at',
    'actions',
  ];
  smsForms: UntypedFormGroup;
  exampleDatabase?: SmsService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Sms>(true, []);
  id?: number;
  sms?: Sms;
  valueFilter: any = null;
  permissions!: any[]
  due_date!: any
  status!: any
  breadscrums = [
    {
      title: 'All Task',
      items: ['Task'],
      active: 'All Task',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public smsService: SmsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService : AuthService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    super();
    if (localStorage.getItem('due_dateSms') ) {
      this.due_date = JSON.parse(localStorage.getItem('due_dateSms') || '')
    }
    if (localStorage.getItem('statusSms')) {
      this.status = JSON.parse(localStorage.getItem('statusSms') || '')
    }

    this.smsForms = this.fb.group({
      due_date: [this.due_date],
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
    this.permissions = this.authService.currentUserValue.permissions
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    this.router.navigate([
      "/founder/organisations/all-sms/add-sms"
    ]);
  }

  get f() {
    return this.smsForms.controls;
  }

  setUser() {
    if (this.f["idUser"].value != null) {
      localStorage.setItem('idUserSms', JSON.stringify(this.f["idUser"].value));
    } else {
      localStorage.setItem('idUserSms', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setStatus() {
    if (this.f["status"].value != null) {
      localStorage.setItem('statusSms', JSON.stringify(this.f["status"].value));
    } else {
      localStorage.setItem('statusSms', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setPriority() {
    if (this.f["priority"].value != null) {
      localStorage.setItem('prioritySms', JSON.stringify(this.f["priority"].value));
    } else {
      localStorage.setItem('prioritySms', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setDate() {
    if (this.f["due_date"].value != null) {
      localStorage.setItem('due_dateSms', JSON.stringify(this.f["due_date"].value));
    } else {
      localStorage.setItem('due_dateSms', JSON.stringify(null));
    }
    this.ngOnInit();
  }


  About(row: Sms) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutSmsComponent, {
      data: { sms: row},
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
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Sms>(true, []);
    });
    for( let i of this.selection.selected){
      this.smsService.deleteSms(i.id);
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
    this.exampleDatabase = new SmsService(
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
        description: x.message,
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
  onContextMenu(event: MouseEvent, item: Sms) {
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
export class ExampleDataSource extends DataSource<Sms> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Sms[] = [];
  renderedData: Sms[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: SmsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<Sms[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllSmss(data, this.paginator.pageIndex, this.paginator.pageSize);
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
