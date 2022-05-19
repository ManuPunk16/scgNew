import { Component, OnInit } from '@angular/core';
import { SeriesLabels } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-info-lexius',
  templateUrl: './info-lexius.component.html',
  styleUrls: ['./info-lexius.component.css']
})
export class InfoLexiusComponent implements OnInit {

  public initCount: number[] = [
    82503,
    84378,
    86929,
    88941,
    91031
  ];

  public finalCount: number[] = [
    84378,
    86929,
    88941,
    91031,
    0
  ];

  public diferenceTotal: number[] = [
    1875,
    2551,
    2012,
    2090
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
