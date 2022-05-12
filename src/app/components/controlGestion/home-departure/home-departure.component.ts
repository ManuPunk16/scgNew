import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DepartureService } from 'src/app/service/departure.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Departure } from 'src/app/models/departure';
import { Global } from 'src/app/service/global';
import { TokenStorageService } from '../../../service/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Instrumentos } from 'src/app/models/instrumento';
import { Asignacion } from 'src/app/models/areas';
import { Estatus } from 'src/app/models/estatus';

//Telerik
import { DataBindingDirective, GridComponent } from "@progress/kendo-angular-grid";
import { PageChangeEvent, PageSizeItem } from "@progress/kendo-angular-grid";
import { NotificationService } from "@progress/kendo-angular-notification";

@Component({
  selector: 'app-home-departure',
  templateUrl: './home-departure.component.html',
  styleUrls: ['./home-departure.component.css'],
  providers: [DepartureService]
})
export class HomeDepartureComponent implements OnInit {

  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;

  public pageSize = 10;
  public skip = 0;
  public pageSizes: (PageSizeItem | number)[] = [
    10,
    50,
    100,
    {
      text: "All",
      value: "all",
    },
  ];

  public formGroup!: FormGroup;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  public title: string;
  public instrumento = Instrumentos.instrumentos;
  public asignacion = Asignacion.asignacion;
  public estat = Estatus.estatus;
  public departures: Departure[] = [];
  public gridView: Departure[] = [];
  public pdfEntry: Array<File> = [];
  public pdfExit: Array<File> = [];

  public dep: Departure;
  public depEdit: Departure;
  public depDelete: Departure;
  public status: string = "";
  public selectedId: any;

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
  closeResult!: string;
  getDismissReason: any;

  constructor(
    public formulario: FormBuilder,
    private _departureService: DepartureService,
    private _route: ActivatedRoute,
    private _router: Router,
    private zone: NgZone,
    private tokenStorageService: TokenStorageService,
    public modal: NgbModal,
    private notificationService: NotificationService
  ) {
    // console.log(_router.url);
    this.title = "Gestor";

    this.dep = new Departure;
    this.depEdit = new Departure;
    this.depDelete = new Departure;

    this.asignacion;
    this.instrumento;
    this.estat;
  }

  ngOnInit(): void {
    this.gridView = this.departures;
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

  public async _try(): Promise<void>{
    try {
      const res = await this._departureService.getDepartures().toPromise();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // public onFilter(input: Event): void {
  //   const inputValue = (input.target as HTMLInputElement).value;

  //   this.gridView = process(this.departures, {
  //     filter: {
  //       logic: "or",
  //       filters: [
  //         {
  //           field: "num_folio",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "num_oficio",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "fecha_oficio",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "fecha_recepcion",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "fecha_vencimiento",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "ins_juridico",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "remitido",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "asignado",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "asunto",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "estatus",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //         {
  //           field: "observacion",
  //           operator: "contains",
  //           value: inputValue,
  //         },
  //       ],
  //     },
  //   }).data;

  //   this.dataBinding.skip = 0;
  // }

  public opened = false;

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public sliderChange(pageIndex: number): void {
    this.skip = (pageIndex - 1) * this.pageSize;
  }

  public onPageChange(state: PageChangeEvent): void {
    this.pageSize = state.take;
  }

  openEdit(content: any) {
    this.modal.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getDeps() {
    //Mostrar contenido tabla principal
    this._departureService.getDepartures().subscribe(
      res => {
        this.departures = res.departure;
        this.departures.sort(
          (a, b) => (a.num_folio > b.num_folio) ? -1 : 1
        );
      },
      err => console.log(err)
    );
  }

  getDepartureById(dataItem: any): void {
    let departureEdit = dataItem;
    this.depEdit = departureEdit;
    console.log(this.depEdit);
  }

  deleteDepartureById(dataItem: any): void{
    this.depDelete = dataItem;
    this._departureService.delete(this.depDelete._id).subscribe(
      response => {
        console.log(response);
        this.zone.runOutsideAngular(() => {
          location.reload();
        });
      },
      error => {
        console.log(error);
        this.zone.runOutsideAngular(() => {
          location.reload();
        });
      }
    );
  }

  onEdit(){
    this._departureService.updateDeparture(this.depEdit._id, this.depEdit).subscribe(
      res => {
        this.showEditSuccess();
        this.modal.dismissAll();
      },
      error => {
        this.showEditError();
        console.log(error);
      }
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
          this.showSubmitError();
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

  public showSubmitError(): void {
    this.notificationService.show({
      content: "Verifica que tu información que insertas sea la correcta!",
      hideAfter: 900,
      position: { horizontal: "left", vertical: "top" },
      animation: { type: "fade", duration: 700 },
      type: { style: "warning", icon: true, },
    });
  }

  public showEditSuccess(): void {
    this.notificationService.show({
      content: "Documento Editado con Exito!",
      hideAfter: 900,
      position: { horizontal: "left", vertical: "top" },
      animation: { type: "fade", duration: 700 },
      type: { style: "success", icon: true },
    });
  }

  public showEditError(): void {
    this.notificationService.show({
      content: "Hay un error!",
      hideAfter: 900,
      position: { horizontal: "left", vertical: "top" },
      animation: { type: "fade", duration: 700 },
      type: { style: "error", icon: true },
    });
  }
}
