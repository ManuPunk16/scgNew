import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from 'src/app/models/document';
import { Global } from 'src/app/service/global';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-homec',
  templateUrl: './homec.component.html',
  styleUrls: ['./homec.component.css'],
  providers: [DocumentService]
})
export class HomecComponent implements OnInit {

  public title: string;
  public instrumento: Array<any>;
  public estat: Array<any>;
  documents: Document[] = [];
  public pdfEntry: any = [];
  public pdfExit: any = [];

  public doc: Document;
  public status: string | undefined;

  constructor(
    public formulario: FormBuilder,
    private _documentService: DocumentService,
    private _router: Router,
    private zone: NgZone,
    private sanitizer: DomSanitizer
  ) {

    this.title = "Gestor";

    this.doc = new Document(1, '', '', '', '', '', '', '', '', '', null, null);

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
    // console.log(this.doc);
    // this._documentService.uploadEntry(this.doc).subscribe(
    //   response => {},
    //   error => {}
    // );

    this._documentService.create(this.doc).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.doc = response.doc;
          this.zone.runOutsideAngular(() => {
            location.reload();
          });
          // this._router.navigate(['ControlGestion/inicio']);
        } else {
          // console.log(this.status);
          this.zone.runOutsideAngular(() => {
            location.reload();
          });
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  capturarEntrada(event: any):any{
    const entradaCapturada = event.target.files[0];
    // this.pdfEntry.push(entradaCapturada).then();
    console.log(entradaCapturada);
  }

  capturarSalida(event: any):any{
    console.log(event.target.files);
  }

  // extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
  //   try {
  //     const unsafePdf = window.URL.createObjectURL($event);
  //     const pdf = this.sanitizer.bypassSecurityTrustUrl(unsafePdf);
  //     const reader = new FileReader();
  //     reader.readAsDataURL($event);
  //     reader.onload = () => {
  //       resolve({
  //         base: reader.result
  //       });
  //     }
  //     reader.onerror = error =>{
  //       resolve({
  //         base:null
  //       });
  //     }
  //   } catch (error) {
  //     return null;
  //   }
  // });
}
