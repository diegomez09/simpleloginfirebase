import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario:UsuarioModel;

  constructor() {
    this.usuario = new UsuarioModel();
   }

  ngOnInit() {
  }

  logIn(form:NgForm){
    if(form.invalid){return;}
    // console.log(form);
    console.log('Formulario valido');
    console.log(form);
  }

}
