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
  public tablec: Array<any>;
  public instrumento: Array<any>;
  public estatus: Array<any>;
  formDocs:FormGroup;
  documents: Document[] = [];

  constructor(
    public formulario:FormBuilder,
    private _documentService: DocumentService
    ) {

    this.title = "Gestor";
    this.tablec = [
      {
        num_oficio: "1123",
        ins_juridico: "Decreto",
        fecha_recepcion: "55/31/5646",
        remitido: "Jorge",
        origen: "Direccion suprema",
        direccion: "Legales",
        director: "Leon",
        asunto: "Limitrofe",
        estatus: "Acvito",
        observacion: ""
      },
      {
        num_oficio: null,
        ins_juridico: null,
        fecha_recepcion: null,
        remitido: null,
        origen: null,
        direccion: null,
        director: null,
        asunto: null,
        estatus: null,
        observacion: null 
      },
      // {
      //   num_oficio: null,
      //   inst_juridico: null,
      //   fecha_recepcion: null,
      //   remitido: null,
      //   origen: null,
      //   direccion: null,
      //   director: null,
      //   asunto: null,
      //   estatus: null,
      //   observacion: null 
      // }
    ];

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
    // console.log(this._documentService.pruebas());
    this._documentService.getDocuments().subscribe(
      // response => {
      //   console.log(response);
      //   if (response) {
      //     this.documents = response;
      //   }else{

      //   }
      //   console.log(this.documents);
      // },
      // error => {
      //   console.log(error);
      // }
      res => {
        this.documents = res.document;
        // console.log(res);
        let documents = res;
        let array = [];
        array.push(documents);
        console.log(array);
      },
      err => console.log(err)
    );
  }
}
