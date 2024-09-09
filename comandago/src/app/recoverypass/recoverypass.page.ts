import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recoverypass',
  templateUrl: './recoverypass.page.html',
  styleUrls: ['./recoverypass.page.scss'],
})
export class RecoverypassPage implements OnInit {
  recoveryPassForm: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController, public router: Router) {

    this.recoveryPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  async onSubmit() {
    if (this.recoveryPassForm.invalid) {
      return;
    }

    const email = this.recoveryPassForm.value.email;

    // Lógica para enviar el correo electrónico de recuperación

    const alert = await this.alertController.create({
      header: 'Correo Enviado',
      message: 'Se ha enviado un correo electrónico para recuperar tu contraseña.',
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
