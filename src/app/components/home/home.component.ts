import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title: string;
  public card: Array<any>;

  constructor() {
    this.title = "Catalogo de Sistemas";
    this.card = [
      {
        titulo: "Contról de Gestión",
        descripcion: "En este sistema podras entrar al control de gestion",
        acceso: "ControlGestion",
        actualizacion: "Ultima actualizacion hace: 3 min"
      },
      {
        titulo: "Informe Estadistico Lexius",
        descripcion: "Informes",
        acceso: "InformeLexius",
        actualizacion: "Ultima actualizacion hace: 3 min"
      },
      {
        titulo: "Informe Estadistico Pagina Web",
        descripcion: "Informes",
        acceso: "InformeCj",
        actualizacion: "Ultima actualizacion hace: 3 min"
      }
    ];
  }

  ngOnInit(): void {
  }

}
