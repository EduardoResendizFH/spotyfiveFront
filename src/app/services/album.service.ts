import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Album } from '../models/album';
import { RequestOptions } from '@angular/http';
import { tokenKey } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public url = GLOBAL.url;

  constructor( private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addAlbum(token, album : Album){
    let params = JSON.stringify(album);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
    });

    return this._http.post(`${this.url}/album`, params, {headers: headers}).pipe(map((res:any)=> 
    res    
   ));
  }

  getAlbum(token, id:string){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
    });

    return this._http.get(`${this.url}/album/${id}`, {headers: headers}).pipe(map((res:any)=> 
     res    
    ));
    
  }

  editAlbum(token, id:string, album: Album){
    let params = JSON.stringify(album);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
    });

    return this._http.put(`${this.url}/album/${id}`,params, {headers: headers}).pipe(map((res:any)=> 
     res    
    ));
    
  }

  deleteAlbum(token, id: string){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
    });

    return this._http.delete(`${this.url}/album/${id}`,{headers: headers}).pipe(map((res:any) =>{
      res
    }))
  }

  getAlbums(token, artistId = null){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
    });

    if (artistId == null) {
      return this._http.get(`${this.url}/albums`, {headers: headers}).pipe(map((res:any)=> 
       res    
      ));
    }else{
      return this._http.get(`${this.url}/albums/${artistId}`, {headers: headers}).pipe(map((res:any)=> 
       res 
      ));   
    }
  }
}
 