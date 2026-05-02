import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticleMovementsService } from './articleMovements.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ArticleMovements } from 'src/app/core/models/articleMovements.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';/* 
import { ArticleMovementsDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { ArticleMovementsDeleteDialogComponent } from './dialogs/delete/delete.component'; */
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

@Component({
  selector: 'app-all-articleMovements',
  templateUrl: './all-articleMovements.component.html',
  styleUrls: ['./all-articleMovements.component.scss'],
})
export class AllArticleMovementsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'article',
    'operationType',
    'quantity',
    'stock',
    'created_at',/* 
    'actions', */
  ];
  exampleDatabase?: ArticleMovementsService;
  articleMovementForm: UntypedFormGroup;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<ArticleMovements>(true, []);
  id?: number;
  articleMovements?: ArticleMovements;
  valueFilter: any = null;
  permissions!: any []
  operationType!: any
  breadscrums = [
    {
      title: 'All ArticleMovement',
      items: ['ArticleMovement'],
      active: 'All ArticleMovement',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public articleMovementsService: ArticleMovementsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService ,
    public translateService: TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    super();
    if (localStorage.getItem('operationType')) {
      this.operationType = JSON.parse(localStorage.getItem('operationType') || '')
    } 
    this.articleMovementForm = this.fb.group({
      operationType: [this.operationType]
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
      "/founder/stocks/all-articleMovements/add-articleMovement"
    ]);
  }

  get f() {
    return this.articleMovementForm.controls;
  }

  settypeArticleMovement() {
    if (this.f["operationType"].value != null) {
      localStorage.setItem('operationType', JSON.stringify(this.f["operationType"].value));
    } else {
      localStorage.setItem('operationType', JSON.stringify(null));
    }
    this.ngOnInit();
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
        this.servicesService.route.articleMovements[0],
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
    this.exampleDatabase = new ArticleMovementsService(
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
        Name: x.article.name,/* 
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
  onContextMenu(event: MouseEvent, item: ArticleMovements) {
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
export class ExampleDataSource extends DataSource<ArticleMovements> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ArticleMovements[] = [];
  renderedData: ArticleMovements[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: ArticleMovementsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<ArticleMovements[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllArticleMovementss(data, this.paginator.pageIndex, this.paginator.pageSize);
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
