import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Departure } from '../../../models/departure';
import { Global } from 'src/app/service/global';
import { DepartureService } from 'src/app/service/departure.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../service/token-storage.service';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.css']
})
export class DeparturesComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  orderHeader: String = '';
  isDescOrder: boolean = true;
  p: number = 1;
  public url: string;
  public cantidades: Array<any>;

  @Input() departures: Departure[] = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private _departureService: DepartureService,
    private zone: NgZone,
    private _router: Router
  ) {
    this.url = Global.url;

    this.cantidades = [
      {
        name: "5",
      },
      {
        name: "15",
      },
      {
        name: "50"
      },
      {
        name: "200"
      }
    ];
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

  sort(headerName:String){
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  delete(id: any){
    this._departureService.delete(id).subscribe(
      response => {
        this.zone.runOutsideAngular(() => {
          location.reload();
        });
      },
      error => {
        console.log(error);
      }
    );
  }

}