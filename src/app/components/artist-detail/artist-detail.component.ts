import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService  } from '../../services/artist.service';
import { Artist } from '../../models/artist';


@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistDetailComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
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
            //Sacar los albums del artista
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

}
 