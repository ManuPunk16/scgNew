import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // template: `
  // <app-search [item]="currentItem"></app-search>
  // `
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  public searchString: string = "";
  public currentItem = "Hola Mundo!";
  public route: any = "";

  constructor(
    private tokenStorageService: TokenStorageService,
    private _router : Router,
    private _route : ActivatedRoute
  ) {
    // this.route = _router.url + _route.url;
    // console.log(this.route);
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  goSearch(){
    this._router.navigate(['ControlGestion/buscar/', this.searchString]);
  }
}
