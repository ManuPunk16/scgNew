import { Component, OnInit } from '@angular/core';
import { SeriesLabels } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-info-web-page',
  templateUrl: './info-web-page.component.html',
  styleUrls: ['./info-web-page.component.css']
})
export class InfoWebPageComponent implements OnInit {

  public initCount: number[] = [
    29452,
    29894,
    30549,
    31114,
    31591,
    32577
  ];

  public finalCount: number[] = [
    29894,
    30549,
    31114,
    31591,
    32577,
    0
  ];

  public diferenceTotal: number[] = [
    442,
    655,
    565,
    477,
    986
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    padding: 3,
    font: "bold 12px Arial, sans-serif",
  };

}
