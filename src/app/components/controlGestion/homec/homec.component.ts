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
  public pdfEntry: Array<File> = [];
  public pdfExit: Array<File> = [];

  public doc: Document;
  public status: string = "";

  constructor(
    public formulario: FormBuilder,
    private _documentService: DocumentService,
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
    // console.log(this._documentService.uploadEntry,"Subir");
    // console.log(this.doc);
    // this._documentService.uploadEntry(this.doc).subscribe(
    //   response => {
    //     console.log(response, "Response");
    //   },
    //   error => {
    //     console.log(error, "Error")
    //   }
    // );

    this._documentService.create(this.doc).subscribe(
      response => {
        if (response.status === 'Success') {
          this.status = 'success';
          this.doc = response.doc;
          this.zone.runOutsideAngular(() => {
            location.reload();
          });
        } else {
          // console.log(response);
          // this.zone.runOutsideAngular(() => {
          //   location.reload();
          // });
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
    console.log(this.doc);
  }

  capturarEntrada(event: any): any {
    // this.pdfEntry = event.target.files[0];
    // console.log(this.pdfEntry);
    const entradaCapturada = event.target.files[0];
    // this.pdfEntry.push(entradaCapturada).then();
    console.log(entradaCapturada);
    // this._documentService.create(entradaCapturada).subscribe(
    //   res => {
    //     console.log(res,"Resultado");
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  capturarSalida(event: any): any {
    console.log(event.target.files);
  }

  // extraerBase64 = async ($event: any) => new Promise((resolve) => {
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
  //     reader.onerror = error => {
  //       resolve({
  //         base: null
  //       });
  //     }
  //   } catch (error) {
  //     return null;
  //   }
  // });

  // private patchItemImages(paths: string[]) {
  //   this.imagesImporterService.getListBlobImagesFromBackend(paths)
  //     .pipe(finalize(() => { this.loading--; }))
  //     .subscribe((images) => {
  //       const files = images.map((x, i) => this.createFileFromBlob(x, paths[i]));

  //       this.productosService.saveImages(this.productId, files).subscribe(() => {
  //         this.notifierService.notify('success', 'Producto guardado correctamente.');
  //         this.getAllItems();
  //       },
  //         error => {
  //           this.notifierService.notify('error', error);
  //         });
  //     });
  // }

  // private createFileFromBlob(blob: Blob, path: string) {
  //   return new File([blob], this.getFileName(`${path}.jpeg`));
  // }

  // private getFileName(path: string) {
  //   return path.split('\\').pop();
  // }

}