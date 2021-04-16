import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  addSong(token, song: Song){
    let params = JSON.stringify(song);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
    });

    return this._http.post(`${this.url}song`, params, {headers: headers}).pipe(map((res:any)=> 
     res    
    ));
  }
}
