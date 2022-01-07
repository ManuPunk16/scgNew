import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Document } from '../models/document';

@Injectable()
export class DocumentService{

    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    pruebas(){
        return "Soy el servicio de documentos";
    }

    getDocuments():Observable<any>{
        return this._http.get<Document[]>(this.url+'documents');
    }
}