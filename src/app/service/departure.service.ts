import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Departure } from '../models/departure';

@Injectable()
export class DepartureService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    getDepartures(): Observable<any> {
        return this._http.get<Departure[]>(this.url + 'salidas');
    }

    getDeparture(departureId: string): Observable<any>{
        return this._http.get(this.url+'salidas/'+departureId);
    }

    createDeparture(departure: any): Observable<any> {
        let params = JSON.stringify(departure);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'guardar_salidas', params, { headers: headers });
    }

    updateDeparture(id: string, departure: Departure): Observable<any> {
        let params = JSON.stringify(departure);
        // let params = document;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + 'salidas/' + id, params, { headers: headers });
    }

    delete(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'salidas/' + id, { headers: headers });
    }

    uploadExit(File: File, id: string): Observable<any> {
        let peticion = "subir-salida/" + id;
        let json = JSON.stringify(File);
        console.log(File);
        console.log(id);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post<File>(this.url + peticion, { headers: headers });
    }
}