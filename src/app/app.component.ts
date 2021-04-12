import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Spotyfive';
  public user: User;
  public identity;
  public token;
  public errorMessage;
  public register:User;
  public alertRegister;

  constructor(
    private _userService: UserService,
    private _route:ActivatedRoute,
    private _router: Router
  ){
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.register = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(){

    this.identity = this._userService.getIdentity();
    this.token =  this._userService.getToken();

    console.log(this.identity, 'storage');
    console.log(this.token, 'storage');
    
  }  

  public onSubmit(){
    console.log(this.user,'Usuario desde el front');
    //Conseguir los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      data =>{
        let identity = data.user;
        this.identity = identity;

        if (!this.identity._id) {
          alert('El usuario no esta correctamente identificado');
        }else{
          // Crear elemento en el localstorage para tener al usuario en sesion
          localStorage.setItem('identity', JSON.stringify(identity));
          //Conseguir el token para enviarselo a cada peticion
          this._userService.signup(this.user, 'true').subscribe(
            response =>{
              let token = response.token;
              this.token = token;
      
              if (this.token.length <= 0) {
                alert('El token no se ha generado');
              }else{
                //Crear elemento en el local storage
                // Crear elemento en el localstorage para tener al usuario en sesion
                localStorage.setItem('token', token);
                // console.log(token);
                // console.log(identity, 'Identity');
                this.user = new User('', '', '', '', '', 'ROLE_USER', '');
              }
            }
          )
        }

      },
    
    error=>{
      var errorMessage = <any>error;
      console.log(errorMessage);
      if (errorMessage != null) {
        var parsedError = error.error.message;
        console.log(parsedError);
        this.errorMessage = parsedError;
      }
    }
    )
    
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();

    this.identity = null;
    this.token = null;

    this._router.navigate(['/']);
  }

  onSubmitRegister(){
    console.log(this.register);
    this._userService.register(this.register).subscribe(
      response =>{
        let user = response.user;
        this. register = user

        if (!user._id) {  
          this.alertRegister = 'Error al registrarte';
        }else{
          this.alertRegister = 'El registro se realizo correctamente'
          this.user = this.register = new User('', '', '', '', '', 'ROLE_USER', '');
        }
      },
    error=>{
      var errorMessage = <any>error;
      if (errorMessage != null) {
        var parsedError = error.error.message;
        console.log(parsedError);
        this.alertRegister = parsedError;
      }
    }
    )
  }

  // goArtist(){
  //   console.log('Hola mundo');
  //   this._router.navigate(['/artists'])
    
  // }
}
