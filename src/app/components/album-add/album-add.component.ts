import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers: [UserService, ArtistService, AlbumService]
})
export class AlbumAddComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public idAlbum: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _albumService: AlbumService
  ) { 
    this.titulo = 'Crear nuevo album';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('', '', 2021 , '', '');
  }

  ngOnInit() { 
    console.log('La pagina de agregar album esta');
    
  }

  onSubmit(){
    this._route.params.forEach((params: Params) =>{
      let artist_id = params['artist'];
      this.album.artist = artist_id;

      this._albumService.addAlbum(this.token, this.album).subscribe(
        response=>{
          if (!response.album) {
            this.alertMessage = "Error en el servidor";
          }else{
            this.alertMessage = 'El albuma se ha creado correctamente';
            this.album = response.album;
            this.idAlbum = response.album._id
            this._router.navigate(['/editar-album', this.idAlbum]);
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
      
    });
  }

}
