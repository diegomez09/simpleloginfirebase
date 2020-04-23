import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDrZpvgXvk7khi-idN5yBGSOEC9WU8VXPQ';
  constructor(private http:HttpClient) { }

  //crearNuevoUsuario
    //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //iniciarSesion
    //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  logIn(usuario:UsuarioModel){

  }

  logOut(){

  }

  signUp(usuario:UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    );
  }

  }
