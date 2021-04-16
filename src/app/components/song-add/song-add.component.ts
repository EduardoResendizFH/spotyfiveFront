import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css']
})
export class SongAddComponent implements OnInit {
  public titulo: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _songService: SongService
  ) { 
    this.titulo = 'Crear una nueva Cancion';
    this.identity = this._userService.getIdentity();
    this.token =this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1, '', '', '', '',)
  }

  ngOnInit() {
    console.log('Add component esta cargando');
    
  }

  onSubmit(){
    // console.log(this.song);
    this._route.params.forEach((params: Params) =>{
      let album_id = params['album']
      this.song.album = album_id;

      this._songService.addSong(this.token, this.song).subscribe(
        response =>{
          if (!response.song) {
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'La cancion se ha creado correctamente';
            this.song = response.song;
            console.log(this.song);
            
            // this._router.navigate([])
          }
        },
        error =>{
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
        }
      )
      
    })
    
  }

}
