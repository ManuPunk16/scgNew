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

    let myMoment = moment('2022-05-31 13:20').fromNow();
    let myMomentCG = moment('2022-06-20 12:40').fromNow();
    let now = moment().format('DD/MM/YYYY hh:mm');

    this.title = "Catalogo de Sistemas";
    this.card = [
      {
        titulo: "Sistema de Control de Gestión",
        descripcion: "En este apartado podrás entrar al control de gestión",
        acceso: "Login",
        actualizacion: "Última actualización: "+ myMomentCG
      },
      {
        titulo: "Informe Estadístico Lexius",
        descripcion: "Informes",
        acceso: "InformeLexius",
        actualizacion: "Última actualización hace: " + myMoment
      },
      {
        titulo: "Informe Estadístico Página Web",
        descripcion: "Informes",
        acceso: "InformePaginaOficial",
        actualizacion: "Última actualización hace: " + myMoment
      },
      {
        titulo: "Informes Estadísticos Control Gestión",
        descripcion: "Podras consultar con gráficas el contenido de entradas.",
        acceso: "Estadisticas",
        actualizacion: "Última actualización hace: " + myMomentCG
      }
    ];
  }

  ngOnInit(): void {
  }

}
