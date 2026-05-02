import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexFill,
  ApexResponsive,
  ApexTheme,
  ApexNonAxisChartSeries,
} from "ng-apexcharts";
import { AuthService } from "src/app/core/service/auth.service";
import { ServicesService } from "src/app/core/service/services.service";
export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  legend: ApexLegend;
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  colors: string[];
  responsive: ApexResponsive[];
  labels: string[];
  theme: ApexTheme;
  series2: ApexNonAxisChartSeries;
};

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public areaChartOptions!: Partial<chartOptions>;
  public barChartOptions!: Partial<chartOptions>;
  public performanceRateChartOptions!: Partial<chartOptions>;
  public polarChartOptions!: Partial<chartOptions>;
  statistiques: any = {
    clients_count: 0,
    confirmed_bookings: 0,
    total_bookings: 0,
    total_orders:0  
  };
  cash_in_by_payment_method : any[] = [];
  per_month: any = {};
  hide = false;
  fin = false;
  loading = false; 
  finances!: any;
  scholar_level!: String;
  months: string[] = [];
  expenses: any[] = [];
  monies: any[] = [];
  stats_finances: any[] = [];
  stats_bookings: any[] = [];
  breadscrums = [
    {
      title: "Dashboad",
      items: [],
      active: "Dashboard 1",
    },
  ];
  constructor(
    private servicesService: ServicesService,
    private authService: AuthService,
    public translateService: TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem("lang") as string);
  }

  ngOnInit() {
    this.chart1();
    this.chart2();
    this.getStatistique();
    this.getFinancess();
    this.getStastBookingss();
    this.scholar_level = this.authService.currentUserValue.scholar_level;
  }

  getStatistique() {
    const paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id, 
    };
    this.servicesService.addObjets(
      this.servicesService.route.statistics[0], paylaod
    ).subscribe({
      next: (res) => {
        this.statistiques = res.data;
        this.cash_in_by_payment_method = res.data.cash_in_by_payment_method;
        this.hide = true;
        console.log(this.statistiques);
      },
    });
  }

  getFinancess() {
    const paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id, 
    };
    this.servicesService.addObjets(
      this.servicesService.route.statistics[1], paylaod
    ).subscribe({
      next: (res) => {
        this.stats_finances = res.data;
        this.fin = true;
      },
    });
  }

  getStastBookingss() {
    const paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id, 
    };
    this.servicesService.addObjets(
      this.servicesService.route.statistics[2], paylaod
    ).subscribe({
      next: (res) => {
        this.stats_bookings = res.data;
        this.fin = true;
      },
    });
  }

  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: "encaissement",
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: "décaissement",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#9F8DF1", "#E79A3B"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        show: true,
        borderColor: "#9aa0ac",
        strokeDashArray: 1,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };
  }

  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: "percent",
          data: [5, 8, 10, 14, 9, 7, 11, 5, 9, 16, 7, 5],
        },
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#9aa0ac"],
        },
      },
      grid: {
        show: true,
        borderColor: "#9aa0ac",
        strokeDashArray: 1,
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr",
          "May", "Jun", "Jul", "Aug",
          "Sep", "Oct", "Nov", "Dec",
        ],
        position: "bottom",
        labels: {
          offsetY: 0,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: "gradient",
        colors: ["#4F86F8", "#4F86F8"],
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    };
  }
}
