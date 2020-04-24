import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario:UsuarioModel;

  constructor(private auth:AuthService) {
    this.usuario = new UsuarioModel();
   }

  ngOnInit() {
  }

  logIn(form:NgForm){
    if(form.invalid){return;}
    //console.log(form);
    //console.log('Formulario valido');  
    this.auth.logIn(this.usuario).subscribe(
      resp =>{
        //console.log(resp);
      }, (err) =>{
        console.log(err.error.error.message);
      });  
  }

}
