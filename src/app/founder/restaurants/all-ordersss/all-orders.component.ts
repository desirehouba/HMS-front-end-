import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from './orders.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Orders } from 'src/app/core/models/orders.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';/* 
import { OrdersDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { OrdersDeleteDialogComponent } from './dialogs/delete/delete.component'; */
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
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AboutOrderComponent } from './dialogs/about-order/about-order.component';
import { OrdersDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'customer.name', 
    'price',
    'status',
    'payment_status',
    'delivery_date',
    'actions',
  ];
  exampleDatabase?: OrdersService;
  orderForm: UntypedFormGroup;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Orders>(true, []);
  id?: number;
  orders?: Orders;
  valueFilter: any = null;
  permissions!: any []
  typeOrder!: any
  loading = false;
  statusOrder!: any
  breadscrums = [
    {
      title: 'All Order',
      items: ['Order'],
      active: 'All Order',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService ,
    public translateService: TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    super();

    this.orderForm = this.fb.group({
      payment_status: [localStorage.getItem('payment_status_restaur') ? JSON.parse(localStorage.getItem('payment_status_restaur') || '') : ''],
      status: [localStorage.getItem('status_restaur') ? JSON.parse(localStorage.getItem('status_restaur') || '') : ''],
      date_start: ['', [Validators.required]],
      date_end: ['', [Validators.required]],
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
    this.setDate(false);
    this.permissions = this.authService.currentUserValue.permissions;
  }
  refresh() {
    this.loadData();
  }

  addNew() { 
    this.router.navigate([
      "/founder/restaurants/all-orders/add-order"
    ]);
  }

  get f() {
    return this.orderForm.controls;
  }

  setDate(i: boolean) {
      if (i === true) {
        localStorage.setItem('date_start_order_restaurant', formatDate(this.orderForm.controls['date_start'].value,'YYYY-MM-dd', 'en-US'));
        localStorage.setItem('date_end_order_restaurant', formatDate(this.orderForm.controls['date_end'].value,'YYYY-MM-dd', 'en-US'));
      } else {
        localStorage.setItem('date_start_order_restaurant', '');
        localStorage.setItem('date_end_order_restaurant', '');
      }
      this.loadData();
    }
  

  setStatus() {
    if (this.f["status"].value != null) {
      localStorage.setItem('status_restaur', JSON.stringify(this.f["status"].value));
    } else {
      localStorage.setItem('status_restaur', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  setStatusPayment() {
    if (this.f["payment_status"].value != null) {
      localStorage.setItem('payment_status_restaur', JSON.stringify(this.f["payment_status"].value));
    } else {
      localStorage.setItem('payment_status_restaur', JSON.stringify(null));
    }
    this.ngOnInit();
  } 

  editCall(row: Orders) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(OrdersDialogComponent, {
      data: {
        orders: row,
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
            this.ordersService.getDialogData();
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

  About(row: Orders) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutOrderComponent, {
      data: { orders: row, },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
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
        this.servicesService.route.orders[0],
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
    this.exampleDatabase = new OrdersService(
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
        Name: x.customer.name,/* 
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
  onContextMenu(event: MouseEvent, item: Orders) {
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
export class ExampleDataSource extends DataSource<Orders> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Orders[] = [];
  renderedData: Orders[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: OrdersService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<Orders[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllOrderss(data, this.paginator.pageIndex, this.paginator.pageSize);
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
