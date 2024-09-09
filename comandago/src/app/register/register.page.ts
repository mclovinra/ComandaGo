import { Component, OnInit,} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { CheckboxCustomEvent, AlertController } from '@ionic/angular';
import {NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  

  formularioRegistro: FormGroup;

  canDismiss = false;
  presentingElement: Element | null = null;

  constructor(public router: Router ,
    public fb: FormBuilder,
    public alertController: AlertController,
    public NavController: NavController, 
    public animationCtrl: AnimationController) {

    this.formularioRegistro = this.fb.group({
      'userName': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'passwordConfirm': new FormControl("",Validators.required),
      'email': new FormControl ("", [Validators.required, Validators.email])
    })
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }


  goToLogin(){
    this.router.navigate(['/login'])
  }

  async saveUser(){

    var f = this.formularioRegistro.value;
    
    if (this.formularioRegistro.invalid) 
    {
      // Verifica si el campo de email es inválido
      const emailControl = this.formularioRegistro.get('email');
      if (emailControl?.invalid) 
      {
        let message = '';
    
        if (emailControl.hasError('email')) 
        {
          const alert = await this.alertController.create({
            header: 'Email inválido',
            message: 'Por favor ingrese un correo electrónico válido.',
            buttons: ['Aceptar'],
          });

          await alert.present();
          return; // Sale de la función si hay error en el email
        } 
      }

      // Verifica si los campos de contraseña no coinciden
      const password = this.formularioRegistro.get('password')?.value;
      const confirmPassword = this.formularioRegistro.get('passwordConfirm')?.value;

      console.log(password + " - " + confirmPassword);
      if (password !== confirmPassword) {
        const alert = await this.alertController.create({
          header: 'Contraseñas no coinciden',
          message: 'Las contraseñas no coinciden, por favor verifique.',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return; // Sale de la función si hay error de contraseña
      }

      // Verifica si algún campo está vacío
      if (!f.valid) {
        const alert = await this.alertController.create({
          header: 'Datos incompletos',
          message: 'Debe de llenar todos los campos.',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return; // Sale de la función si un campo es vacio
      }
    }

    var newUser = {
      userName: f.userName,
      password: f.password
    }

    localStorage.setItem('user',JSON.stringify(newUser));
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

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    if (!root) {
      return this.animationCtrl.create(); // Devuelve una animación vacía si root es null
    }

    const backdropElement = root.querySelector('ion-backdrop');
    const wrapperElement = root.querySelector('.modal-wrapper');

    if (!backdropElement || !wrapperElement) {
      return this.animationCtrl.create(); // Devuelve una animación vacía si los elementos no están presentes
    }

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(backdropElement)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(wrapperElement)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(250)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement | null) => {
    if (!baseEl) {
      return this.animationCtrl.create(); // Devuelve una animación vacía si baseEl es null
    }

    const enterAnim = this.enterAnimation(baseEl);

    if (!enterAnim) {
      return this.animationCtrl.create(); // Devuelve una animación vacía si enterAnimation devolvió null
    }

    return enterAnim.direction('reverse');
  };

  onTermsChanged(event: CustomEvent) {
    // Usa CustomEvent y accede a detail.checked
    this.canDismiss = (event.detail as { checked: boolean }).checked;
  }
}
