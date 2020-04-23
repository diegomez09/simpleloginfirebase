import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  public usuario:UsuarioModel;

  constructor(private auth: AuthService) {    
   }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
    
    }
     
    onSubmit( form:NgForm ){
      if(form.invalid){return;}
      console.log("Formulario enviado");
      console.log(this.usuario);
      this.auth.signUp(this.usuario)
      .subscribe(token =>{
        console.log(token);
      },(err)=>{
        console.log(err.error.error.message);
      })
    }


}
