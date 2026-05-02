import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SupplyDemandsService } from './supplyDemands.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SupplyDemands } from 'src/app/core/models/supplyDemands.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';/* 
import { SupplyDemandsDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { SupplyDemandsDeleteDialogComponent } from './dialogs/delete/delete.component'; */
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
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AboutSupplyDemandComponent } from './dialogs/about-supplyDemand/about-supplyDemand.component';
import { SupplyDemandsDialogComponent } from './dialogs/form-dialog/form-dialog.component';

@Component({
  selector: 'app-all-supplyDemands',
  templateUrl: './all-supplyDemands.component.html',
  styleUrls: ['./all-supplyDemands.component.scss'],
})
export class AllSupplyDemandsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select', 
    'creator',
    'priority',
    'status',
    'created_at',
    'actions',
  ];
  exampleDatabase?: SupplyDemandsService;
  supplyDemandForm: UntypedFormGroup;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<SupplyDemands>(true, []);
  id?: number;
  supplyDemands?: SupplyDemands;
  valueFilter: any = null;
  permissions!: any []
  typeSupplyDemand!: any
  statusSupplyDemand!: any
  breadscrums = [
    {
      title: 'All SupplyDemand',
      items: ['SupplyDemand'],
      active: 'All SupplyDemand',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public supplyDemandsService: SupplyDemandsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService ,
    public translateService: TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    super();

    this.supplyDemandForm = this.fb.group({
      typeSupplyDemand: [this.typeSupplyDemand],
      status: [this.statusSupplyDemand]
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
    this.permissions = this.authService.currentUserValue.permissions;
  }
  refresh() {
    this.loadData();
  }

  addNew() { 
    this.router.navigate([
      "/founder/stocks/all-supplyDemands/add-supplyDemand"
    ]);
  }

  get f() {
    return this.supplyDemandForm.controls;
  }

  setStatus() {
    if (this.f["status"].value != null) {
      localStorage.setItem('statusSupplyDemand', JSON.stringify(this.f["status"].value));
    } else {
      localStorage.setItem('statusSupplyDemand', JSON.stringify(null));
    }
    this.ngOnInit();
  }
  editCall(row: SupplyDemands) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(SupplyDemandsDialogComponent, {
      data: {
        supplyDemands: row,
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
            this.supplyDemandsService.getDialogData();
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

  About(row: SupplyDemands) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutSupplyDemandComponent, {
      data: { supplyDemands: row, },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.router.navigate(
          ["/founder/stocks/all-vouchers"]
        );
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
    for (let i of this.selection.selected) {
      
      // suppressions des elements
      this.servicesService.deleteObjetsMulti(
        this.servicesService.route.supplyDemands[0],
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
    this.exampleDatabase = new SupplyDemandsService(
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
        Name: x.description,/* 
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
  onContextMenu(event: MouseEvent, item: SupplyDemands) {
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
export class ExampleDataSource extends DataSource<SupplyDemands> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: SupplyDemands[] = [];
  renderedData: SupplyDemands[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: SupplyDemandsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<SupplyDemands[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllSupplyDemandss(data, this.paginator.pageIndex, this.paginator.pageSize);
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
