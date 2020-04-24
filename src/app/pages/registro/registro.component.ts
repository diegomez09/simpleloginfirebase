import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  public usuario:UsuarioModel;
  recordar:boolean=false;

  constructor(private auth: AuthService, private router:Router) {    
   }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
    
    }
     
    onSubmit( form:NgForm ){
      if(form.invalid){return;}
      if(localStorage.getItem('email')){
        this.usuario.email = localStorage.getItem('email');
        this.recordar = true;
      }
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor.'
      });
      Swal.showLoading();
      //console.log("Formulario enviado");
      //console.log(this.usuario);
      this.auth.signUp(this.usuario)
      .subscribe(token =>{
        Swal.close();
        this.router.navigateByUrl('/home');
        // console.log(token);
      },(err)=>{
        Swal.fire({          
          icon: 'error',
          title: 'Error al registrar',
          text: err.error.error.message,
        });
        // console.log(err.error.error.message);
      })
    }


}
