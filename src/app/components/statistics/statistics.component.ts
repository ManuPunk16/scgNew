import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  //GRAFICA #1
  public barChartLabels: string[] = [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
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
