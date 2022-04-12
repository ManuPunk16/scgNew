import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  //GRAFICA #1
  public barChartLabels: string[] = [ 
    'CJ',     //Consejero Jurídico
    'SPCS',   //Secretaria Particular y de Comunicación Social
    'DCCG',   //Dirección de Coordinación y Control de Gestión
    'DGC',    //Dirección General Contenciosa
    'DATCC',  //Dirección de Asistencia Técnica y Combate a la Corrupción
    'DSL',    //Dirección de Servicios Legales
    'DGC',    //Dirección General Consultiva
    'DEL',    //Dirección de Estudios Legislativos
    'DEJ',    //Dirección de Estudios Jurídicos
    'DCNAIG', //Dirección de Compilación Normativa, Archivo e Igualdad de Género
    'DA'      //Dirección Administrativa
  ];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [ 
        0, //Consejero Jurídico
        0, //Secretaria Particular y de Comunicación Social
        0, //Dirección de Coordinación y Control de Gestión
        34, //Dirección General Contenciosa
        0, //Dirección de Asistencia Técnica y Combate a la Corrupción
        174, //Dirección de Servicios Legales
        14, //Dirección General Consultiva
        74, //Dirección de Estudios Legislativos
        77, //Dirección de Estudios Jurídicos
        0, //Dirección de Compilación Normativa, Archivo e Igualdad de Género
        0  //Dirección Administrativa
      ], label: 'Concluidos' },
      { data: [ 
        0, //Consejero Jurídico
        0, //Secretaria Particular y de Comunicación Social
        0, //Dirección de Coordinación y Control de Gestión
        4, //Dirección General Contenciosa
        0, //Dirección de Asistencia Técnica y Combate a la Corrupción
        20, //Dirección de Servicios Legales
        0, //Dirección General Consultiva
        19, //Dirección de Estudios Legislativos
        9, //Dirección de Estudios Jurídicos
        0, //Dirección de Compilación Normativa, Archivo e Igualdad de Género
        0  //Dirección Administrativa
      ], label: 'Tramites' },
      { data: [ 
        0, //Consejero Jurídico
        0, //Secretaria Particular y de Comunicación Social
        0, //Dirección de Coordinación y Control de Gestión
        34, //Dirección General Contenciosa
        0, //Dirección de Asistencia Técnica y Combate a la Corrupción
        174, //Dirección de Servicios Legales
        14, //Dirección General Consultiva
        74, //Dirección de Estudios Legislativos
        77, //Dirección de Estudios Jurídicos
        0, //Dirección de Compilación Normativa, Archivo e Igualdad de Género
        0  //Dirección Administrativa
      ], label: 'Conocimiento' },
    ]
  };

  //GRAFICA #2
  public barChartLabels2: string[] = [ '2006', '2007', '2008', '2009', '2010', '2011', '2022' ];
  public barChartType2: ChartType = 'bar';

  public barChartData2: ChartData<'bar'> = {
    labels: this.barChartLabels2,
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 99 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series C' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series D' }
    ]
  };

  //GRAFICA #3
  public barChartLabels3: string[] = [ '2006', '2007', '2008', '2009', '2010', '2011', '2022' ];
  public barChartType3: ChartType = 'bar';

  public barChartData3: ChartData<'bar'> = {
    labels: this.barChartLabels3,
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 99 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series C' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series D' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series E' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series F' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
