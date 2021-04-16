import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService  } from '../../services/artist.service';
import { AlbumService  } from '../../services/album.service';
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';


@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
  providers: [UserService, ArtistService, AlbumService]
})
export class ArtistDetailComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public albums: Album[];
  public artistId: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _albumService: AlbumService
  ) { 
    this.titulo = 'Editar artista';
    this.identity = _userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Funciona el Artist detail');
    this.getArtist();
  }

  getArtist(){
    this._route.params.forEach((params: Params) =>{
      let id = params['id'];

      this._artistService.getArtist(this.token, id).subscribe(
        response => {
          if (!response.artist) {
            this._router.navigate(['/']);
          }else{
            this.artist = response.artist;
            this.artistId = response.artist._id;
            //Sacar los albums del artista
            this._albumService.getAlbums(this.token, this.artistId ).subscribe(
              response => {
                if (!response.albums) {
                  this.alertMessage = "Este artista no tiene albums"
                }else{
                  this.albums = response.albums;
                  console.log(this.albums,'Albums');
                  
                }
              },
              error =>{
                var errorMessage = <any>error;

                if (errorMessage != null) {
                  var body = JSON.parse(error._body);
                  console.log(error);
                  
                }
              }
            );
          }
        },
        error =>{
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            console.log(error);
            
          }
        }
      )
    });
  }

  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelAlbum(){
    this.confirmado = null;
  }

  onDeleteAlbum(id){
    this._albumService.deleteAlbum(this.token, id).subscribe(
      response => {
        this.getArtist();
        console.log(response);
        
      },
      error=>{
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          console.log(error);
          
        }
      }
    )
  }

}
 