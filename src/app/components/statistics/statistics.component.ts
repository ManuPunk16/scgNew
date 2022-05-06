import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from 'src/app/service/document.service';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { ChartComponent } from "@progress/kendo-angular-charts";
import { saveAs } from "@progress/kendo-file-saver";
import { SeriesLabels } from "@progress/kendo-angular-charts";
import { Document } from 'src/app/models/document';
import { Category } from 'src/app/models/model.chart';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [DocumentService]
})

export class StatisticsComponent implements OnInit {

  @ViewChild("chart")
  private chart!: ChartComponent;

  public documents: Document[] = [];

  public gridData: Category[] = [
    {
      cabecera: "CJ",
      descripcion: "OFICINA DEL CONSEJERO JURÍDICO"
    },
    {
      cabecera: "DGC",
      descripcion: "DIRECCIÓN GENERAL CONSULTIVA"
    },
    {
      cabecera: "DGdC",
      descripcion: "DIRECCIÓN GENERAL DE LO CONTENCIOSO"
    },
    {
      cabecera: "DEL",
      descripcion: "DIRECCIÓN DE ESTUDIOS LEGISLATIVOS"
    },
    {
      cabecera: "DEJ",
      descripcion: "DIRECCIÓN DE ESTUDIOS JURÍDICOS"
    },
    {
      cabecera: "DSL",
      descripcion: "DIRECCIÓN DE SERVICIOS LEGALES"
    },
    {
      cabecera: "DATCC",
      descripcion: "DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN"
    },
    {
      cabecera: "DCNAIG",
      descripcion: "DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO"
    },
    {
      cabecera: "DCCG",
      descripcion: "DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN"
    },
    {
      cabecera: "DA",
      descripcion: "DIRECCIÓN ADMINISTRATIVA"
    },
    {
      cabecera: "UT",
      descripcion: "UNIDAD DE TRANSPARENCIA"
    }
  ];

  public categories: string[] = [
    'CJ',
    'DGC',
    'DGdC',
    'DEL',
    'DEJ',
    'DSL',
    'DATCC',
    'DCNAIG',
    'DCCG',
    'DA',
    'UT'
  ];
  public concluido: number[] = []; //Concluido
  public tramite: number[] = []; //En Tramite
  public conocimiento: number[] = []; //Para Conocimiento

  constructor(private _documentService: DocumentService){

  }

  ngOnInit(): void {
    this.getTest();
  }

  public exportChart(): void {
    this.chart.exportImage().then((dataURI) => {
      saveAs(dataURI, "chart.png");
    });
  }

  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    padding: 3,
    font: "bold 12px Arial, sans-serif",
  };

  getTest():void{
    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
        this.tramite[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'Concluido').length;
        this.concluido[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
        this.conocimiento[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
        this.conocimiento[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
        this.tramite[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'Concluido').length;
        this.concluido[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'Concluido').length;
        this.concluido[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
        this.tramite[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
        this.conocimiento[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
        this.conocimiento[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
        this.tramite[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'Concluido').length;
        this.concluido[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'Concluido').length;
        this.concluido[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
        this.tramite[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
        this.conocimiento[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
        this.tramite[5] = result;
        console.log(this.tramite[5], "En Tramite");
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'Concluido').length;
        this.concluido[5] = result;
        console.log(this.concluido[5]);
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
          this.conocimiento[5] = result;
        console.log(this.conocimiento[5]);
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
          this.conocimiento[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
          this.tramite[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'Concluido').length;
          this.concluido[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'Concluido').length;
          this.concluido[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
          this.tramite[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
          this.conocimiento[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
          this.conocimiento[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
          this.tramite[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'Concluido').length;
          this.concluido[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'Concluido').length;
          this.concluido[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
          this.tramite[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
          this.conocimiento[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'Para Conocimiento').length;
          this.conocimiento[10] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'En Tramite').length;
          this.tramite[10] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'Concluido').length;
          this.concluido[10] = result;
      },
      err => {
        console.log(err);
      }
    );
  }
}
