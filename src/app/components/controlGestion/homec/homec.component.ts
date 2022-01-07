import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Document } from 'src/app/models/document';

@Component({
  selector: 'app-homec',
  templateUrl: './homec.component.html',
  styleUrls: ['./homec.component.css'],
  providers: [DocumentService]
})
export class HomecComponent implements OnInit {

  public title: string;
  public instrumento: Array<any>;
  public estatus: Array<any>;
  formDocs:FormGroup;
  documents: Document[] = [];

  public doc: Document;

  constructor(
    public formulario:FormBuilder,
    private _documentService: DocumentService
    ) {

    this.title = "Gestor";

    this.doc = new Document('','','','','','','','','','','',null,null);

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

    this.estatus = [
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

    this.formDocs = this.formulario.group({
      num_oficio:[''],
      ins_juridico:[''],
      fecha_recepcion:[''],
      remitido:[''],
      origen:[''],
      asunto:[''],
      estatus:[''],
      observacion:['']
    });
  }

  ngOnInit(): void {
    this.getDocs();
  }

  getDocs(){
    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
      },
      err => console.log(err)
    );
  }

  onSubmit(){
    console.log(this.doc);
  }
}
