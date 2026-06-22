import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingsService } from './bookings.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Bookings } from 'src/app/core/models/bookings.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBookingDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { AboutBookingComponent } from './dialogs/about-booking/about-booking.component';
import { DeleteBookingsDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss'],
})
export class AllBookingsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'user.name',
    'room',
    'start_date',
    'end_date',
    'duration',
    'price',
    'status',
    'payment_status',
    'actions',
  ];
  exampleDatabase?: BookingsService;
  bookingForm: UntypedFormGroup; 
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Bookings>(true, []);
  id?: number;
  bookings?: Bookings;
  image : string;
  valueFilter: any = null;
  user = false;
  loading = false;
  users : any [] = [];
  permissions!: any []
  currentUser = this.authService.currentUserValue; 

  filterUsers!: any[]; 
  onInputChange(event: any) {
    const searchInput = event.target.value.toLowerCase();
    this.filterUsers = this.users.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  onOpenChange(searchInput: any) {
    searchInput.value = "";
    this.filterUsers = this.users;
  } 
  breadscrums = [
    {
      title: 'All Booking',
      items: ['Booking'],
      active: 'All Booking',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public bookingsService: BookingsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService :AuthService,
    public translateService : TranslateService,
    public servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    super();
    this.image = environment.imageDirectoryPatchs 
    this.bookingForm = this.fb.group({
      payment_status: [localStorage.getItem('paymentStatusBookings') ? JSON.parse(localStorage.getItem('paymentStatusBookings') || '') : ''],
      status: [localStorage.getItem('statusBookings') ? JSON.parse(localStorage.getItem('statusBookings') || '') : ''], 
      date_start: [localStorage.getItem('date_start_booking'), [Validators.required]],
      date_end: [localStorage.getItem('date_end_booking'), [Validators.required]],
      client: [localStorage.getItem('clientBookings') ? JSON.parse(localStorage.getItem('clientBookings') || '') : ''],
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
    this.getUserss();
    this.permissions = this.authService.currentUserValue.permissions
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    this.router.navigate([
      "/founder/hosting/all-bookings/add-booking"]);
  }

  get f() {
    return this.bookingForm.controls;
  }  

  setStatus() {
    if (this.f["status"].value != null) {
      localStorage.setItem('statusBookings', JSON.stringify(this.f["status"].value));
    } else {
      localStorage.setItem('statusBookings', JSON.stringify(null));
    }
    this.ngOnInit();
  } 

  setPaymentStatus() {
    if (this.f["payment_status"].value != null) {
      localStorage.setItem('paymentStatusBookings', JSON.stringify(this.f["payment_status"].value));
    } else {
      localStorage.setItem('paymentStatusBookings', JSON.stringify(null));
    }
    this.ngOnInit();
  } 


  setDate(i: boolean) {
    if (i === true) {
      localStorage.setItem('date_start_booking', formatDate(this.bookingForm.controls['date_start'].value,'yyyy-MM-dd', 'en-US'));
      localStorage.setItem('date_end_booking', formatDate(this.bookingForm.controls['date_end'].value,'yyyy-MM-dd', 'en-US'));
    } else {
      this.f['date_start'].reset()
      this.f['date_end'].reset()
      localStorage.setItem('date_start_booking', '');
      localStorage.setItem('date_end_booking', ''); 
    }
    this.loadData();
  }

  setClient() {
    if (this.f["client"].value != null) {
      localStorage.setItem('clientBookings', JSON.stringify(this.f["client"].value));
    } else {
      localStorage.setItem('clientBookings', JSON.stringify(null));
    }
    this.ngOnInit();
  }

  getUserss() {
    this.user = true;
    const paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id,
      role_id: 5
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => { 
        this.users = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.users = this.users.sort(SortArray); 
        this.filterUsers = this.users.sort(SortArray);
        this.user = false;
      },
      error: (error) => {
        this.user = false;
      }, 
    });
  }

  editCall(row: Bookings) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormBookingDialogComponent, {
      data: {
        bookings: row,
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
            this.bookingsService.getDialogData();
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
  About(row: Bookings) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AboutBookingComponent, {
      data: { bookings: row, },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => { 
      if (result === 1) {
        this.loadData();
      }
    });
  }
  deleteItem(row: Bookings) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteBookingsDialogComponent, {
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
      this.selection = new SelectionModel<Bookings>(true, []);
    });
    
    for( let i of this.selection.selected){
      this.bookingsService.deleteBookings(i.id);
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
    this.exampleDatabase = new BookingsService(
      this.httpClient, this.router, this.authService, this.servicesService
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
        reasons: x.id,
        //Customers: x.customer.name,
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
  onContextMenu(event: MouseEvent, item: Bookings) {
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
export class ExampleDataSource extends DataSource<Bookings> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Bookings[] = [];
  renderedData: Bookings[] = [];
  meta!: any;
  constructor(
    public exampleDatabase: BookingsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(data: any): Observable<Bookings[]> {
    
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.exampleDatabase.metaChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllBookingss(data, this.paginator.pageIndex, this.paginator.pageSize);
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