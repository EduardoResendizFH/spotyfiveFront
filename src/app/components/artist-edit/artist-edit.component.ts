import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { GLOBAL } from '../../services/global';
import { Artist } from '../../models/artist';


@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistEditComponent implements OnInit {
  public titulo: string;
  public artist:any = Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    public _artistService: ArtistService
  ) { 
    this.titulo = "Editar un nuevo artista";
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('', '', '');
  }


  ngOnInit() {
    this.getArtist();
  }

  getArtist(){
    console.log('Funciona el getArtist');
    
    this._route.params.forEach((params: Params) =>{
      let id = params['id'];

      this._artistService.getArtist(this.token, id).subscribe(
        response =>{
          if (!response.artist) {
            this._router.navigate(['/']);
          }else{
            this.artist = response.artist;
            console.log(this.artist);
            
            
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage) {
            var body = JSON.parse(error._body);
            console.log(error);
            
          }
        }
      )

    });
  }

  onSubmit(){
    // console.log(this.artist);
    this._route.params.forEach((params: Params) =>{
      let id = params['id'];
      this._artistService.editArtist(this.token, id, this.artist).subscribe(
        response =>{
          if (!response.artist) {
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'El artista se ha actyualizado correctamente';
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage) {
            var body = JSON.parse(error._body);
            console.log(error);
            
          }
        }
      )

    });
  }

}
