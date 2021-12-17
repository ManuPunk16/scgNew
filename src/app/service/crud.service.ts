import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './users';
import { documents } from './documents';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  API: string='http://localhost:80/API';

  constructor(private clientHttp:HttpClient) { }

  AgregarUsuario(datosUsuario:Users):Observable<any>{
    return this.clientHttp.post(this.API+"?insertar=1",datosUsuario);
  }

  AgregarDocumento(datosDocs:Document):Observable<any>{
    return this.clientHttp.post(this.API+"?registrar=1",datosDocs);
  }

}
