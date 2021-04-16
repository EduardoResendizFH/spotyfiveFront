import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService
  ) { 
    this.identity =this._userService.getIdentity();
    this.token =this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Album detail esta cargando');
    //SACAR ALBUN DE LA BASE DE DATOS
    this.getAlbum();
  }

  getAlbum(){
    console.log('Metodo para sacar el album');
    this._route.params.forEach((params: Params) =>{
      let id = params['id'];

      this._albumService.getAlbum(this.token, id).subscribe(
        response =>{
          if (!response.album) {
            this._router.navigate(['/']);
          }else{
            this.album = response.album;
          }
        }
      )
    })
    
  }

}
