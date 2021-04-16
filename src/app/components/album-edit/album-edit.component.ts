import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { Artist } from '../../models/artist';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {
  public titulo: string;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;
  public idAlbum: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService
  ) {
    this.titulo = 'Editar album';
    this.identity = this._userService.getIdentity();
    this.token = _userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('', '', 2021, '', '',);
    this.is_edit = true;
    
   }

  ngOnInit() {
    console.log('Hola mundo desde ña pagina editar');
    this.getAlbum();
  }


  getAlbum(){
      this._route.params.forEach((params:Params) =>{
        let id = params['id']; 
        //  let id = '6075c62ce04e7b591828a10b';
        
        this._albumService.getAlbum(this.token, id).subscribe(
          // (data:any)=>{
          //   console.log(data);
            
          // }
          response =>{
            if (!response.album) {
              this._router.navigate(['/']);
            }else{
              this.album = response.album;
              console.log(this.album);
              
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
      })
  }

  // TRAER LOS ALBUMS DE LOS ARTISTA EL ID

  // getAlbum(){
  //   this._route.params.forEach((params:Params) =>{
  //     let id = params['id']; //traer el id del artista
      
  //     this._albumService.getAlbum(this.token, id).subscribe(
  //       response =>{
  //         if (!response.albums) {
  //           this._router.navigate(['/']);
  //         }else{
  //           this.album = response.albums[0];
  //           this.idAlbum = response.albums[0]._id;
  //           console.log(this.album);
            
  //         }
  //       },
  //       error =>{
  //         var errorMessage = <any>error;
  //         if (errorMessage != null) {
  //           var body = JSON.parse(error._body);
  //           console.log(error);
  //         }
  //       }
  //     )
  //   })
  // }

  onSubmit(){     
    this._route.params.forEach((params: Params) =>{
      let id = params['id']; // id del album
      this._albumService.editAlbum(this.token, id, this.album).subscribe(
        response => {
          // console.log(response);
          
          if (!response.album) {
            this.alertMessage = 'Error en el servidor'
          }else{
            this.alertMessage = 'El album se ha actualizado correctamente';
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
