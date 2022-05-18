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

    let myMoment = moment('2022-05-18 13:00').fromNow();
    let now = moment().format('DD/MM/YYYY hh:mm');

    this.title = "Catalogo de Sistemas";
    this.card = [
      {
        titulo: "Sistema de Control de Gestión",
        descripcion: "En este apartado podrás entrar al control de gestión",
        acceso: "Login",
        actualizacion: "Última actualización: "+ myMoment
      },
      {
        titulo: "Informe Estadístico Lexius",
        descripcion: "Informes",
        acceso: "InformeLexius",
        actualizacion: "Última actualización hace: not valid :" + now
      },
      {
        titulo: "Informe Estadístico Página Web",
        descripcion: "Informes",
        acceso: "InformeCj",
        actualizacion: "Última actualización hace: not valid"
      }
    ];
  }

  ngOnInit(): void {
  }

}
