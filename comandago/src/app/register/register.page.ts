import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public router: Router ,public fb: FormBuilder, public alertController: AlertController) {

    this.formularioRegistro = this.fb.group({
      'userName': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'passwordComfirm': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  async saveUser(){

    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debe de llenar todos los campos.',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }

    var newUsuario = {
      userName: f.userName,
      password: f.password
    }

    localStorage.setItem('user',JSON.stringify(newUsuario));
    const alert = await this.alertController.create({
      header: 'Registro',
      message: 'Usuario registrado exitosamente.',
      buttons: [
      {
        text: 'Aceptar',
        handler: () => {
          this.goToLogin();
        }
      }
    ],
    });
    await alert.present();
  }

}
