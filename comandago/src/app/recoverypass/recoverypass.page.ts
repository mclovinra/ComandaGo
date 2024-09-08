import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recoverypass',
  templateUrl: './recoverypass.page.html',
  styleUrls: ['./recoverypass.page.scss'],
})
export class RecoverypassPage implements OnInit {
  recoveryPassForm: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController) {

    this.recoveryPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
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
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
