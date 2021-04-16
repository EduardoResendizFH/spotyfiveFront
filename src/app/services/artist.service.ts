import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';
import { RequestOptions } from '@angular/http';

@Injectable()

export class ArtistService{

    public url: string;


    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    getArtists(token, page){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(`${this.url}/artists/${page}`, {headers: headers}).pipe(map((res:any)=> 
         res    
        ));

    }

    getArtist(token, id: string){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(`${this.url}/artist/${id}`, {headers: headers}).pipe(map((res:any)=> 
         res    
        ));
    }

    addArtist(token, artist:Artist){
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(`${this.url}/artist`, params, {headers: headers}).pipe(map((res:any)=> 
         res    
        ));
    }

    editArtist(token, id:string, artist:Artist){
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(`${this.url}artist/${id}`, params, {headers: headers}).pipe(map((res:any)=> 
         res    
        ));
    }

    deleteArtist(token, id: string){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.delete(`${this.url}artist/${id}`, {headers: headers}).pipe(map((res:any)=> 
         res    
        ));
    }
}