import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public titulo: string;
  public user: User;
  public identity;
  public token;

  constructor(
      private _userService: UserService
  ) { 
    this.titulo = 'Actualizar mis datos';
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.user = this.identity
  }

  ngOnInit() {
    this.titulo = 'Actualizar mis datos;'
    // this.user = new User('', '', '', '', '', 'ROLE_USER', '');

    //Liocalstorage
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
    
  }

  onSubmit(){
    console.log(this.user);
    

  }

}
