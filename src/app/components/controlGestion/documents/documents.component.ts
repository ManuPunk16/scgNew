import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Document } from '../../../models/document';
import { Global } from 'src/app/service/global';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../service/token-storage.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  fileName= 'Entradas.xlsx';
  public docExcel: Array<any> = [];

  orderHeader: String = '';
  isDescOrder: boolean = true;
  p: number = 1;
  public url: string;
  public cantidades: Array<any>;

  @Input() documents: Document[] = [];

  constructor(
    private tokenStorageService: TokenStorageService,
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
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
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

  exportexcel(): void{

    let newArray = this.documents.sort(
      (a, b) => (a.num_folio > b.num_folio) ? 1 : -1
    ) as Document[];

    // let resultado = newArray.map(el => {
    //   return[
    //     el.num_folio,
    //     el.num_oficio,
    //     el.fecha_oficio,
    //     el.fecha_recepcion,
    //     el.remitido,
    //     el.asignado,
    //     el.asunto,
    //     el.estatus,
    //     el.observacion
    //   ];
    // });

    /* pass here the table id */
    // let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(newArray);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

}
