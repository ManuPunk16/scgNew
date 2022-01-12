import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchString: string = "";

  constructor(
    private _router : Router,
    private _route : ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  goSearch(){
    this._router.navigate(['ControlGestion/buscar/', this.searchString]);
  }
}
