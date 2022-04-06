import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DepartureService } from 'src/app/service/departure.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Departure } from 'src/app/models/departure';
import { Global } from 'src/app/service/global';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../service/user.service';
import { TokenStorageService } from '../../../service/token-storage.service';

@Component({
  selector: 'app-home-departure',
  templateUrl: './home-departure.component.html',
  styleUrls: ['./home-departure.component.css'],
  providers: [DepartureService]
})
export class HomeDepartureComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  public title: string;
  public instrumento: Array<any>;
  public asignacion: Array<any>;
  public estat: Array<any>;
  departures: Departure[] = [];
  public pdfEntry: Array<File> = [];
  public pdfExit: Array<File> = [];

  public dep: Departure;
  public status: string = "";

  content?: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".pdf,.PDF",
    uploadAPI: {
      url: Global.url + 'subir-entrada/',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir pdf de entrada',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    public formulario: FormBuilder,
    private _departureService: DepartureService,
    private _router: Router,
    private zone: NgZone,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {
    // console.log(_router.url);
    this.title = "Gestor";

    this.dep = new Departure('',1, '', '', '', '', '', '', '', '', '', null);

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
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
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
    console.log(this.dep);
    this._departureService.createDeparture(this.dep).subscribe(
      response => {
        if (response.status === 'Success') {
          this.status = 'success';
          this.dep = response.dep;
          this.zone.runOutsideAngular(() => {
            location.reload();
          });
        } else {
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

  capturarSalida(event: any): any {
    const entradaCapturada = event.target.files[0];
    console.log(entradaCapturada);
  }
}