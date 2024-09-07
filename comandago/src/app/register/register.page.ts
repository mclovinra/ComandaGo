import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public router: Router ,public fb: FormBuilder) {

    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'passwordComfirm': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  guardar(){

    console.log(this.formularioRegistro)
    console.log('Guardado con Exito')
  }

}
