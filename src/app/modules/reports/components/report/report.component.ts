import { Component, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexFill,
  // From here the new imports to be able to graph the new mix chart
  ApexStroke,
  ApexLegend,
  ApexGrid,
  ApexYAxis,
  ApexDataLabels,
  ApexTooltip,
} from "ng-apexcharts";
import { OutputProductService } from 'src/app/services/output-product.service';
import { ProductsService } from 'src/app/services/products.service';
import { RegistrationProductService } from 'src/app/services/registration-product.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  // From here the new imports to be able to graph the new mix chart
  markers: any; //ApexMarkers;
  stroke: ApexStroke;
  grid: ApexGrid;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  legend: ApexLegend;
};


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;

  //graphic chart instance
  public chartOptionsStock: Partial<ChartOptions>;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsEarns: Partial<ChartOptions>;


  //list to save the data to fill in the charts
  //First Chart
  listProductsChartName: any[] = [];
  listProductsChartStock: any[] = [];
  //Second chart
  listRegisterMap = new Map<string, any>();
  listOutMap = new Map<string, any>();
  //Only data values to fill charts
  valuesRegisterSorted: any[] = [];
  namesRegisterSorted: any[] = [];
  valuesOutputSorted: any[] = [];
  namesOutputSorted: any[] = [];
  //var amount
  amountEarns:number=0;
  amountInvest:number=0;


  constructor(private _productsService: ProductsService, private _registrationService: RegistrationProductService,
    private _outputService: OutputProductService) {
    this.chartOptionsStock = {}
    this.chartOptions = {}
    this.chartOptionsEarns = {}
    this.dataProducts();
    //here
    this.dataRegister();
    this.dataOutput();
    //cards report to show totals
    this.dataEarns();
    this.dataInvest();
    
  }

  //first chart
  dataProducts() {
    this._productsService.getProducts().subscribe(data => {
      for (let value of (data as any).productsList) {
        // this.productsNameStock[value.productName]=value.stock;
        this.listProductsChartName.push(value.productName);
        this.listProductsChartStock.push(value.stock);
      }
    })
  }

  //with sort method
  dataRegister() {
    this._registrationService.getDataRegistrationFromDB().subscribe((data: any) => {
      // Convierte detailListRegistration en un array y ordena los datos por idProductBelong:
      let detailList = Array.from(data.detailListRegistration as { idProductBelong: string, productQty: number }[]);
      detailList.sort((a, b) => a.idProductBelong.localeCompare(b.idProductBelong));

      // Ahora puedes procesar los datos ordenados en el bucle for:
      for (let value of detailList) {
        if (!this.listRegisterMap.has(value.idProductBelong)) {
          this.listRegisterMap.set(value.idProductBelong, value.productQty);
        } else {
          let auxQty = this.listRegisterMap.get(value.idProductBelong);
          this.listRegisterMap.set(value.idProductBelong, (Number(value.productQty) + Number(auxQty)));
        }
      }

      for (let [name, val] of this.listRegisterMap.entries()) {
        this.namesRegisterSorted.push(name);
        this.valuesRegisterSorted.push(val);
      }

    })
  }

  dataOutput() {
    this._outputService.getDataOutputFromDB().subscribe((data: any) => {
      // Convierte detailListOutput en un array y ordena los datos por idProductBelong:
      let detailList = Array.from(data.detailListOutput as { idProductBelong: string, productQty: number }[]);
      detailList.sort((a, b) => a.idProductBelong.localeCompare(b.idProductBelong));

      // Ahora puedes procesar los datos ordenados en el bucle for:
      for (let value of detailList) {
        if (!this.listOutMap.has(value.idProductBelong)) {
          this.listOutMap.set(value.idProductBelong, value.productQty);
        } else {
          let auxQty = this.listOutMap.get(value.idProductBelong);
          this.listOutMap.set(value.idProductBelong, (Number(value.productQty) + Number(auxQty)));
        }
      }

      //fill
      for (let [name, val] of this.listOutMap.entries()) {
        this.namesOutputSorted.push(name);
        this.valuesOutputSorted.push(val);
      }

    })
  }

  dataEarns(){
    this._outputService.getDataOutputFromDB().subscribe(data =>{
      console.log(data);
        for(let value of (data as any).headerListOutput){
          this.amountEarns+=value.totalCost;
        }
    });
  }

  dataInvest(){
    this._registrationService.getDataRegistrationFromDB().subscribe(data =>{
        for(let value of (data as any).headerListRegistration){
          this.amountInvest+=value.totalCost;
        }
    });
  }

  //charts
  ngOnInit(): void {

    this.chartOptionsStock = {
      series: [
        {
          name: "existencias",
          data: this.listProductsChartStock
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Existencia de productos"
      },
      fill: {
        colors: ['#8031A7']
      },
      xaxis: {
        categories: this.listProductsChartName
      }
    };

    // Second chart

    this.chartOptions = {
      series: [{
        name: 'Registro',
        type: 'column',
        data: this.valuesRegisterSorted
      }, {
        name: 'Salida',
        type: 'column',
        data: this.valuesOutputSorted
      }],
      chart: {
        height: 350,
        type: 'bar', //change line to bar (fixed error)
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: 'Analisis de ingreso y salida de productos',
        align: 'left',
        offsetX: 110
      },
      xaxis: {
        categories: this.namesRegisterSorted,
        type:'category'
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            }
          },
          title: {
            text: "Registro (cantidad de productos)",
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: 'Income',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396',
            }
          },
          title: {
            text: "Salida de productos (cantidad de productos)",
            style: {
              color: '#00E396',
            }
          },
        },
        {
          seriesName: 'Revenue',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: '#FEB019',
            }
          }
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    };

    //Reporte 2
    this.chartOptionsEarns = {
      series: [{
        name: 'Registro',
        type: 'column',
        data: this.valuesRegisterSorted
      }, {
        name: 'Salida',
        type: 'column',
        data: this.valuesOutputSorted
      }],
      chart: {
        height: 350,
        type: 'bar', //change line to bar (fixed error)
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: 'Analisis de ingreso y salida de productos',
        align: 'left',
        offsetX: 110
      },
      xaxis: {
        categories: this.namesRegisterSorted,
        type:'category'
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            }
          },
          title: {
            text: "Registro (cantidad de productos)",
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: 'Income',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396',
            }
          },
          title: {
            text: "Salida de productos (cantidad de productos)",
            style: {
              color: '#00E396',
            }
          },
        },
        {
          seriesName: 'Revenue',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: '#FEB019',
            }
          }
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    };

  }

}
