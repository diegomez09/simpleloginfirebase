import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDrZpvgXvk7khi-idN5yBGSOEC9WU8VXPQ';
  userToken:string;
  constructor(private http:HttpClient) {
    this.leerToken();
   }

  //crearNuevoUsuario
    //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //iniciarSesion
    //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  logIn(usuario:UsuarioModel){
    //console.log(usuario);
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp=>{
        //console.log('Entró en map');
        this.guardarToken(resp['idToken']);
        return resp;
      })
      );
  }

  logOut(){
  localStorage.removeItem('token');
  }

  signUp(usuario:UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp=>{
        //console.log('Entró en map');
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken(idToken:string){
    this.userToken = idToken;    
    localStorage.setItem('token',idToken);
    let expiraDate = new Date();
    expiraDate.setSeconds(3600);
    localStorage.setItem('expira',expiraDate.getTime().toString())

  }

  public leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
  }

  isAuth():boolean{
    if(this.userToken.length < 2){
      return false;
    }
      const expira = Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);    
      if(expiraDate > new Date()){
        return true;        
      }else{
        return false;
      }    
  }
}