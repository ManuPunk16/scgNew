import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Document } from '../../../models/document'
import { Global } from 'src/app/service/global';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  orderHeader: String = '';
  isDescOrder: boolean = true;
  p: number = 1;
  public url: string;
  public cantidades: Array<any>;

  @Input() documents: Document[] = [];

  constructor(
    private _documentService: DocumentService,
    private zone: NgZone,
    private _router: Router
  ) {
    this.url = Global.url;

    this.cantidades = [
      {
        name: "5",
      },
      {
        name: "15",
      },
      {
        name: "50"
      },
      {
        name: "200"
      }
    ];
  }

  ngOnInit(): void {
  }

  sort(headerName:String){
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  delete(id: any){
    this._documentService.delete(id).subscribe(
      response => {
        this.zone.runOutsideAngular(() => {
          location.reload();
        });
      },
      error => {
        console.log(error);
      }
    );
  }

}
