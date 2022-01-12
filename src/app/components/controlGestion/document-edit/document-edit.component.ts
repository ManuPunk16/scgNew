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

    this.doc = new Document('',1, '', '', '', '', '', '', '', '', '', null, null);

    this.instrumento = [
      {
        id: 1,
        name: "instrumento uno"
      },
      {
        id: 2,
        name: "instrumento dos"
      },
      {
        id: 3,
        name: "instrumento tres"
      },
      {
        id: 4,
        name: "instrumento cuatro"
      },
      {
        id: 5,
        name: "instrumento cinco"
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
    console.log("hola");

    this._documentService.update(this.doc._id,this.doc).subscribe(
      response => {
        if (response.status === 'Success') {
          this.status = 'success';
          this.doc = response.documentUpdated;
          this._router.navigate(['ControlGestion/Inicio']);
        } else {
          // console.log(response);
          // this.zone.runOutsideAngular(() => {
          //   location.reload();
          // });
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
            this._router.navigate(['ControlGestion/Inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['ControlGestion/Inicio']);
        }
      );
    });
  }
}
