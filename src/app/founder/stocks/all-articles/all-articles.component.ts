import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from './articles.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Articles } from 'src/app/core/models/articles.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleFormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { AboutArticleComponent } from './dialogs/about-article/about-article.component';
import { ArticleDeleteDialogComponent } from './dialogs/delete/delete.component';
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
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
})
export class AllArticlesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    "photo",
    'name',
    "service", 
    'type',
    'quantity',
    //'container_quantity',
    'price',
    'actions',
  ];
  exampleDatabase?: ArticlesService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Articles>(true, []);
  id?: number;
  image !: any
  articles?: Articles;
  permissions!: any[];
  valueFilter: any = null;
  breadscrums = [
    {
      title: 'All Article',
      items: ['Article'],
      active: 'All Article',
    },
  ];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public articlesService: ArticlesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService : AuthService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    super();
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
    this.router.navigate(
      ["/founder/stocks/all-articles/add-article"]
    );
  }

  editCall(row: Articles) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ArticleFormDialogComponent, {
      data: {
        articles: row,
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
            this.articlesService.getDialogData();
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
  About(row: Articles) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutArticleComponent, {
      data: {articles: row},
      direction: tempDirection,
    });
  }
  deleteItem(row: Articles) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ArticleDeleteDialogComponent, {
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
      this.selection = new SelectionModel<Articles>(true, []);
    });
    for( let i of this.selection.selected){
      this.articlesService.deleteArticles(i.id);
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
    this.exampleDatabase = new ArticlesService(
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
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.renderedData.map((x) => ({
        Name: x.name,
        price: x.price,
        description: x.description,
      }));

    TableExportUtil.exportToExcel(exportData, 'Liste des Evenements');
  }

  exportPDF() {
    // key libelle with space add in brackets
    const exportData =
      this.dataSource.renderedData.map((x) => ({
        Name: x.name,
        price: x.price,
        description: x.description,
      }));
    TableExportUtil.exportToPDF( exportData,
      'Liste des Evenements');
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
  onContextMenu(event: MouseEvent, item: Articles) {
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
export class ExampleDataSource extends DataSource<Articles> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Articles[] = [];
  renderedData: Articles[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: ArticlesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<Articles[]> {
    
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllArticless(data, this.paginator.pageIndex, this.paginator.pageSize);
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.meta = this.exampleDatabase.meta.total
        this.renderedData = this.exampleDatabase.data
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  
}