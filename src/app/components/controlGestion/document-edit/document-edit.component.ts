import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from 'src/app/models/document';
import { Global } from 'src/app/service/global';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
  providers: [DocumentService]
})
export class DocumentEditComponent implements OnInit {

  public title: string;
  public instrumento: Array<any>;
  public estat: Array<any>;
  documents: Document[] = [];
  public pdfEntry: Array<File> = [];
  public pdfExit: Array<File> = [];
  public url: string;

  public doc: Document;
  public status: string = "";

  constructor(
    public formulario: FormBuilder,
    private _documentService: DocumentService,
    private _route: ActivatedRoute,
    private _router: Router,
    private zone: NgZone,
    private sanitizer: DomSanitizer
  ) {

    this.title = "Gestor";
    this.url = Global.url;
    this.doc = new Document('',1, '', '', '', '', '', '', '', '', '','', null, null);

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
    this.getDocs();
    this.getDoc();
  }

  getDocs() {
    //Mostrar contenido tabla principal
    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    this._documentService.update(this.doc._id,this.doc).subscribe(
      response => {
        if (response.status === 'Success') {
          this.status = 'success';
          this.doc = response.documentUpdated;
          this._router.navigate(['/ControlGestion/inicio']);
          console.log("Bien", response);
        } else {
          // console.log(response);
          // this.zone.runOutsideAngular(() => {
          //   location.reload();
          // });
          this._router.navigate(['/ControlGestion/inicio']);
          console.log("Error", response);
        }
      },
      error => {
        console.log(error,"Es el error");
        this.status = 'error';
      }
    );
    // console.log(this.doc);
  }

  getDoc(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      // console.log(id);

      this._documentService.getDocument(id).subscribe(
        response => {
          if(response.document){
            this.doc = response.document;
            // console.log(response);
          }else{
            this._router.navigate(['ControlGestion/inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['ControlGestion/inicio']);
        }
      );
    });
  }

  capturarEntrada(event: any): any {
    const entradaCapturada = event.target.files[0];
    console.log(entradaCapturada);

    this._documentService.uploadExit(entradaCapturada, this.doc._id).subscribe(
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
