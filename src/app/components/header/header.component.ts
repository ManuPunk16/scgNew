import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // template: `
  // <app-search [item]="currentItem"></app-search>
  // `
})
export class HeaderComponent implements OnInit {

  public searchString: string = "";
  public currentItem = "Hola Mundo!";
  public route: any = "";

  constructor(
    private _router : Router,
    private _route : ActivatedRoute
  ) {
    // this.route = _router.url + _route.url;
    // console.log(this.route);
  }

  ngOnInit(): void {
  }

  goSearch(){
    this._router.navigate(['ControlGestion/buscar/', this.searchString]);
  }
}
