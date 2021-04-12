import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { GLOBAL } from '../../services/global';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [ArtistService, UserService]
})
export class ArtistAddComponent implements OnInit {
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
      this.titulo = "Crear un nuevo artista";
      this.identity = _userService.getIdentity();
      this.token = _userService.getToken();
      this.url = GLOBAL.url;
      this.artist = new Artist('', '', '');


  }

  ngOnInit() {
    console.log('Todo esta chido');
    
  }

  onSubmit(){
    this._artistService.addArtist(this.token, this.artist).subscribe(
      response =>{
        if (!response.artist) {
          this.alertMessage ='Error en el servidor';
          // alert('Error en el Servidor');
        }else{
          this.alertMessage = 'El artista se ha creado correctamente!';
          this.artist = response.artist;
          this._router.navigate(['/editar-artista', response.artist._id]);
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
  }

}
