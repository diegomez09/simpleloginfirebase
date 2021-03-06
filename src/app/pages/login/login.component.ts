import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel = new UsuarioModel();
  recordar= false;

  constructor(private auth:AuthService,
              private router:Router) {    
   }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }

  logIn(form:NgForm){
    if(form.invalid){return;}
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor.'
    });
    Swal.showLoading();
    //console.log(form);
    //console.log('Formulario valido');  
    this.auth.logIn(this.usuario).subscribe(
      resp =>{
        Swal.close();
        if(this.recordar){
          localStorage.setItem('email',this.usuario.email)
        }
        this.router.navigateByUrl('/home');
        //console.log(resp);
      }, (err) =>{
        //console.log(err.error.error.message);
        Swal.fire({          
          icon: 'error',
          title: 'Error al entrar',
          text: err.error.error.message,
        });
      });  
  }

}
