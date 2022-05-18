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

    let myMoment = moment('2022-05-17 18:30').fromNow();
    let now = moment().format('DD/MM/YYYY hh:mm');

    this.title = "Catalogo de Sistemas";
    this.card = [
      {
        titulo: "Sistema de Contról de Gestión",
        descripcion: "En este apartado podras entrar al control de gestión",
        acceso: "Login",
        actualizacion: "Última actualizacion: "+ myMoment
      },
      {
        titulo: "Informe Estadistico Lexius",
        descripcion: "Informes",
        acceso: "InformeLexius",
        actualizacion: "Última actualizacion hace: not valid :" + now
      },
      {
        titulo: "Informe Estadistico Pagina Web",
        descripcion: "Informes",
        acceso: "InformeCj",
        actualizacion: "Última actualizacion hace: not valid"
      }
    ];
  }

  ngOnInit(): void {
  }

}
