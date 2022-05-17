import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title: string;
  public card: Array<any>;

  constructor() {

    let myMoment = moment('2022-05-17 15:22').fromNow();
    let now = moment().format('DD/MM/YYYY hh:mm');

    this.title = "Catalogo de Sistemas";
    this.card = [
      {
        titulo: "Contról de Gestión",
        descripcion: "En este sistema podras entrar al control de gestion",
        acceso: "Login",
        actualizacion: "Ultima actualizacion: "+ myMoment
      },
      {
        titulo: "Informe Estadistico Lexius",
        descripcion: "Informes",
        acceso: "InformeLexius",
        actualizacion: "Ultima actualizacion hace: not valid :" + now
      },
      {
        titulo: "Informe Estadistico Pagina Web",
        descripcion: "Informes",
        acceso: "InformeCj",
        actualizacion: "Ultima actualizacion hace: not valid"
      }
    ];
  }

  ngOnInit(): void {
  }

}
