import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TasksService } from './tasks.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Tasks } from 'src/app/core/models/tasks.mode';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TasksFormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { AboutTasksComponent } from './dialogs/about-tasks/about-tasks.component';
import { TasksDeleteDialogComponent } from './dialogs/delete/delete.component';
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
import { formatDate } from '@angular/common';
/* import { formatDate } from '@angular/common'; */

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'name', 
    'responsible',
    'priority',
    'due_date',
    'status',
    'actions',
  ];
  tasksForms: UntypedFormGroup;
  exampleDatabase?: TasksService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Tasks>(true, []);
  id?: number;
  tasks?: Tasks;
  valueFilter: any = null;
  permissions!: any[]
  due_date!: any
  priority!: any
  status!: any
  idUser!: any
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
    public tasksService: TasksService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService : AuthService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    super();
    if (localStorage.getItem('due_dateTasks') ) {
      this.due_date = JSON.parse(localStorage.getItem('due_dateTasks') || '')
    }
    if (localStorage.getItem('priorityTasks')) {
      this.priority = JSON.parse(localStorage.getItem('priorityTasks') || '')
    }
    if (localStorage.getItem('idUserTasks')) {
      this.idUser = JSON.parse(localStorage.getItem('idUserTasks') || '')
    }
    if (localStorage.getItem('statusTasks')) {
      this.status = JSON.parse(localStorage.getItem('statusTasks') || '')
    }

    this.tasksForms = this.fb.group({
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
    this.permissions = this.authService.currentUserValue.permissions
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    this.router.navigate([
      "/founder/organisations/all-tasks/add-task"
    ]);
  }

  get f() {
    return this.tasksForms.controls;
  }

  setUser() {
    if (this.f["idUser"].value != null) {
      localStorage.setItem('idUserTasks', JSON.stringify(this.f["idUser"].value));
    } else {
      localStorage.setItem('idUserTasks', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setStatus() {
    if (this.f["status"].value != null) {
      localStorage.setItem('statusTasks', JSON.stringify(this.f["status"].value));
    } else {
      localStorage.setItem('statusTasks', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setPriority() {
    if (this.f["priority"].value != null) {
      localStorage.setItem('priorityTasks', JSON.stringify(this.f["priority"].value));
    } else {
      localStorage.setItem('priorityTasks', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setDate() { 
    if (this.f["due_date"].value != null) { 
      localStorage.setItem('due_dateTasks', JSON.stringify(formatDate(this.f['due_date'].value,'YYYY-MM-dd', 'en-US')));
    } else { 
      localStorage.setItem('due_dateTasks', JSON.stringify(null));
    } 
    this.ngOnInit();
  }


  editCall(row: Tasks) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(TasksFormDialogComponent, {
      data: {
        tasks: row,
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
            this.tasksService.getDialogData();
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
  About(row: Tasks) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutTasksComponent, {
      data: { tasks: row},
      direction: tempDirection,
    });
  }
  deleteItem(row: Tasks) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(TasksDeleteDialogComponent, {
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
      this.selection = new SelectionModel<Tasks>(true, []);
    });
    for( let i of this.selection.selected){
      this.tasksService.deleteTasks(i.id);
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
    this.exampleDatabase = new TasksService(
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
        Name: x.name,
        Priority: x.priority,
        User: x.responsible.name,
        description: x.description,
        status: x.status
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
  onContextMenu(event: MouseEvent, item: Tasks) {
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
export class ExampleDataSource extends DataSource<Tasks> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Tasks[] = [];
  renderedData: Tasks[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: TasksService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<Tasks[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllTaskss(data, this.paginator.pageIndex, this.paginator.pageSize);
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
