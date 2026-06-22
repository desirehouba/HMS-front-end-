import { Component } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { ServicesService } from "src/app/core/service/services.service"
import { formatDate } from "@angular/common";
import { Articles } from "src/app/core/models/articles.model"; 
import { Direction } from "@angular/cdk/bidi"; 
import { MatDialog } from "@angular/material/dialog";
import { AddArticleFormDialogComponent } from "src/app/founder/pop-up/add-article/add-article.component";

@Component({
  selector: "app-add-supplyDemand",
  templateUrl: "./add-supplyDemand.component.html",
  styleUrls: ["./add-supplyDemand.component.scss"],
})
export class AddSupplyDemandComponent {
  supplyDemandForm: UntypedFormGroup;

  articles: Articles[] = [];
  responsibles: any[] = [];
  suppliers: any[] = [];
  supplyDemandArrys: any[] = [];
  numbersSupplyDemands = [1,2,3,4,5,6,7,8,9,10]
  supplyDemandData: any;
  supplier = false;
  loading = false;
  responsable = false;
  article = false;
  scholar_level = "";
  breadscrums = [
    {
      title: "Add Rating",
      items: ["Rating"],
      active: "Add Rating",
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public translateService: TranslateService,
    private servicesService: ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem("lang") as string
    );
    this.supplyDemandForm = this.fb.group({
      nbrSupplyDemand: [0, [Validators.required]],
      //name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      responsible_id: ['', [Validators.required]],
      demand_date: ['', [Validators.required]],
      priority  : ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getArticless();
    this.getSuppilerss();
    this.getUserss()
  }


  getArticless() {
    this.article = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,/* 
      service_id : this.authService.currentUserValue.service_id, */
    }
    this.servicesService.getObjetss(
      this.servicesService.route.articles[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.articles = res.data;
        this.article = false;
      },
    });
  }

  getSuppilerss() {
    this.supplier = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      role_id : 4,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.suppliers = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.suppliers = this.suppliers.sort(SortArray); 
        this.supplier = false;
      },
    });
  }

  getUserss() {
    this.responsable = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id, 
      role_types: ["Staffs", "Direction"],
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.responsibles = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.responsibles = this.responsibles.sort(SortArray); 
        this.responsable = false;
      },
    });
  }

  getSupplyDemands() {
    this.supplyDemandArrys = [];
    for (let supplyDemand = 1; supplyDemand <= this.f['nbrSupplyDemand'].value; supplyDemand++) {
      let paylaod = {
        id: null,
        quantity : null,
        unit_price: null,
        supplier_id: null,
      };
      this.supplyDemandArrys.push(paylaod);
    }
  }
  

  editCall() {
    let row
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddArticleFormDialogComponent, {
      data: {
        bookings: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getArticless();
      }
    });
  }

  onEditInit(event: any): void { 
  }

  onEditCancel(event: any): void {}

  get f() {
    return this.supplyDemandForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/stocks/all-supplyDemands"]
    );
  }

  // consommation de api de creation d'un supplyDemand
  addSupplyDemands() {
    // stockage des données du formulaire dans un objet
    // de type supplyDemand qui sera envoyé a api
    let test = true
    this.loading = true; 
    
    for (let supplyDemand of this.supplyDemandArrys) {
      if ( supplyDemand.id === null || supplyDemand.quantity === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = false
      } else{
        test = false
        supplyDemand.unit_price = Number(supplyDemand.id.price)
        supplyDemand.id = supplyDemand.id.id 
      }
    } 
    if (!test) {
      this.supplyDemandData = {
        name: '.',
        description: this.f['description'].value,
        responsible_id: this.f['responsible_id'].value,
        demand_date: formatDate(this.f['demand_date'].value,'YYYY-MM-dd', 'en-US'),
        priority: this.f['priority'].value,
        articles : this.supplyDemandArrys,
      };
      this.servicesService.addObjets(
        this.servicesService.route.supplyDemands[0], this.supplyDemandData
      ).subscribe({
        next: (data) => {
          this.loading = false;
          this.supplyDemandArrys = [];
          this.servicesService.showCustomPosition();
          this.cancel();
        },
        error: (error) => {
          this.loading = false;
          this.servicesService.showCustomPositionEchec(error);
        }, 
      });
    }
  }
}
