import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { OmsService } from './oms.service';
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
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
import { Router } from '@angular/router';
import { RetraitsService } from './retraits.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Retraits } from 'src/app/core/models/retraits.model';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
/* import { formatDate } from '@angular/common'; */

@Component({
  selector: 'app-all-retraits',
  templateUrl: './all-retraits.component.html',
  styleUrls: ['./all-retraits.component.scss'],
})
export class AllRetraitsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'school.name',
    'user.name',
    'mode_retrait',
    //'montant_retrait_brut',
    'montant_retrait_net',
    'status',/* 
    'payment_mode', */
    'date',
    //'actions',
  ];
  transForms: UntypedFormGroup;
  exampleDatabase?: RetraitsService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Retraits>(true, []);
  id?: number;
  oms?: Retraits;
  classrooms: any[] = [];
  sommes: any = 0;
  s: boolean = false;
  breadscrums = [
    {
      title: 'All Oms',
      items: ['Oms'],
      active: 'All Oms',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public omsService: RetraitsService,
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
      date_start: [""],
      date_end: [""],
    });
    
    this.sommes = localStorage.getItem('xom')
    
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
  }
  refresh() {
    this.loadData();
  }

  ss() {
    this.sommes = localStorage.getItem('xom')
    this.s = true
  }

  addNew() {
    this.router.navigate(
      ["/founder/oms/all-retraits/add-retrait"]
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
    this.exampleDatabase = new RetraitsService(
      this.httpClient,
      this.router,
      this.authService,
      this.servicesService
    );
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  // export table data in excel file
  exportExcel() {
    // key libelle with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.renderedData.map((x) => ({
        //Student: x.student.name,
        Amount: x.montant_retrait_net,
        Payment_mode : x.montant_retrait_brut,
        Status : x.status,
        Date : x.date
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
  onContextMenu(event: MouseEvent, item: Retraits) {
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
export class ExampleDataSource extends DataSource<Retraits> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Retraits[] = [];
  renderedData: Retraits[] = [];
  constructor(
    public exampleDatabase: RetraitsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Retraits[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllOmss();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((retraits: Retraits) => {
            const searchStr = (
              retraits.montant_retrait_brut +
              retraits.montant_retrait_net +
              retraits.mode_retrait +
              retraits.date + 
              retraits.status 
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    //disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: Retraits[]): Retraits[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'status':
          [propertyA, propertyB] = [a.status, b.status];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
