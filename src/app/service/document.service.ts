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

    search(searchString: string):Observable<any>{
        return this._http.get(this.url+'search/'+searchString);
    }

    create(document: any):Observable<any>{
        let params = JSON.stringify(document);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save',params,{headers: headers});
    }

    uploadEntry(File: any):Observable<any>{
        let peticion = "subir-entrada/";
        let json = JSON.stringify(File);
        console.log(File);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + peticion,{headers: headers});
    }

    uploadExit(File: any):Observable<any>{
        let peticion = "subir-salida/";
        let json = JSON.stringify(File);
        console.log(File);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + peticion,{headers: headers});
    }
}