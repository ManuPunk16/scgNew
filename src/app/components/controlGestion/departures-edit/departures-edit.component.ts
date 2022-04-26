import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DepartureService } from 'src/app/service/departure.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Departure } from 'src/app/models/departure';
import { Global } from 'src/app/service/global';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-departures-edit',
  templateUrl: './departures-edit.component.html',
  styleUrls: ['./departures-edit.component.css'],
  providers: [DepartureService]
})
export class DeparturesEditComponent implements OnInit {

  public title: string;
  public instrumento: Array<any>;
  public asignacion: Array<any>;
  public estat: Array<any>;
  departures: Departure[] = [];
  public pdfEntry: Array<File> = [];
  public pdfExit: Array<File> = [];
  public url: string;

  public dep: Departure;
  public status: string = "";

  constructor(
    public formulario: FormBuilder,
    private _departureService: DepartureService,
    private _route: ActivatedRoute,
    private _router: Router,
    private zone: NgZone,
    private sanitizer: DomSanitizer
  ) {

    this.title = "Gestor";
    this.url = Global.url;
    this.dep = new Departure;

    this.instrumento = [
      {
        name: "Leyes"
      },
      {
        name: "Reglamentos"
      },
      {
        name: "Acuerdos"
      },
      {
        name: "Decretos"
      },
      {
        name: "Lineamientos"
      },
      {
        name: "Órdenes"
      },
      {
        name: "Convenios"
      },
      {
        name: "Contratos"
      },
      {
        name: "Actas"
      },
      {
        name: "Otros..."
      }
    ];

    this.asignacion = [
      {
        direccion: "Consejero Jurídico"
      },
      {
        direccion: "Secretaria Partiular y de Comunicación Social"
      },
      {
        direccion: "Dirección de Coordinación y Control de Gestión"
      },
      {
        direccion: "Dirección General Contenciosa"
      },
      {
        direccion: "Dirección de Asistencia Técnica y Combate a la Corrupción"
      },
      {
        direccion: "Dirección de Servicios Legales"
      },
      {
        direccion: "Dirección General Consultiva"
      },
      {
        direccion: "Dirección de Estudios Legislativos"
      },
      {
        direccion: "Dirección de Estudios Jurídicos"
      },
      {
        direccion: "Dirección de Compilación Normativa, Archivo e Igualdad de Género"
      },
      {
        direccion: "Dirección Administrativa"
      }
    ];

    this.estat = [
      {
        id: 1,
        name: "En Tramite",
      },
      {
        id: 2,
        name: "Concluido"
      },
      {
        id: 3,
        name: "Para Conocimiento"
      }
    ];
  }

  ngOnInit(): void {
    this.getDeps();
    this.getDep();
  }

  getDeps() {
    //Mostrar contenido tabla principal
    this._departureService.getDepartures().subscribe(
      res => {
        this.departures = res.departure;
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    this._departureService.updateDeparture(this.dep._id, this.dep).subscribe(
      response => {
        this.status = 'success';
        this.dep = response.departureUpdated;
        this._router.navigate(['/Salidas']);
        // console.log("Bien", response);
      },
      error => {
        console.log(error, "Es el error");
        this.status = 'error';
      }
    );
  }

  getDep() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      // console.log(id);

      this._departureService.getDeparture(id).subscribe(
        response => {
          if (response.departure) {
            this.dep = response.departure;
            // console.log(response);
          } else {
            this._router.navigate(['Salidas']);
          }
        },
        error => {
          console.log(error, "Error");
          this._router.navigate(['Salidas']);
        }
      );
    });
  }

  capturarEntrada(event: any): any {
    const entradaCapturada = event.target.files[0];
    console.log(entradaCapturada);

    this._departureService.uploadExit(entradaCapturada, this.dep._id).subscribe(
      response => {
        console.log("Lo bueno: ", response);
      },
      error => {
        console.log("Lo malo:", error);
      }
    );
  }

  capturarSalida(event: any): any {
    const salidaCapturada = event.target.files[0];
    console.log(salidaCapturada);
  }

}
