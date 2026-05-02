import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StaffsService } from './staffs.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Staffs } from 'src/app/core/models/staffs.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StaffFormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { AboutStaffComponent } from './dialogs/about-staff/about-staff.component';
import { StaffDeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
/* import { formatDate } from '@angular/common'; */

@Component({
  selector: 'app-all-staffs',
  templateUrl: './all-staffs.component.html',
  styleUrls: ['./all-staffs.component.scss'],
})
export class AllStaffsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'photo',
    'name', 
    'role',
    'service',
    'phone',
    'gender',
    'actions',
  ];
  exampleDatabase?: StaffsService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Staffs>(true, []);
  id?: number;
  staffs?: Staffs;
  image: any ;
  valueFilter: any = null;
  permissions!: any []
  breadscrums = [
    {
      title: 'All Staff',
      items: ['Staff'],
      active: 'All Staff',
    },
  ];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public staffsService: StaffsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService : AuthService,
    public translateService : TranslateService
  ) {
    super();
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.image = environment.imageDirectoryPatchs
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
      "/founder/organisations/all-staffs/add-staff"
    ]);
  }

  editCall(row: Staffs) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(StaffFormDialogComponent, {
      data: { staffs: row, action: 'edit', },
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
            this.staffsService.getDialogData();
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
  About(row: Staffs) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutStaffComponent, {
      data: { staffs: row,},
      direction: tempDirection,
    });
  }
  deleteItem(row: Staffs) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(StaffDeleteDialogComponent, {
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
    for( let i of this.selection.selected){
      this.staffsService.deleteStaffs(i.id);
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
    this.exampleDatabase = new StaffsService(
      this.httpClient, this.authService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,  this.paginator, this.sort
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
        Name: x.name,
        Poste: x.role.description,
        Telephone: x.phone,
        Nationality: x.nationality,
        City: x.city,
        Email: x.email,
      }));

    TableExportUtil.exportToExcel(exportData, 'Liste du Personnel');
  }


  exportPDF() {
    // key libelle with space add in brackets
    const exportData =
      this.dataSource.renderedData.map((x) => ({
        Name: x.name,
        Poste: x.role.description,
        Telephone: x.phone,
        Nationality: x.nationality,
        City: x.city,
        Email: x.email,
      }));
    TableExportUtil.exportToPDF( exportData,
      'Liste des Parents');
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
  onContextMenu(event: MouseEvent, item: Staffs) {
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
export class ExampleDataSource extends DataSource<Staffs> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Staffs[] = [];
  renderedData: Staffs[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: StaffsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }


  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<Staffs[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllStaffss(data, this.paginator.pageIndex, this.paginator.pageSize);
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.meta = this.exampleDatabase.meta.total
        this.renderedData = this.exampleDatabase.data
        return this.renderedData;
      })
    );
  }
  disconnect() { }
}
