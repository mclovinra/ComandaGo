import { ChangeDetectionStrategy, signal, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as $ from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements OnInit {
  
  hide = signal(true);

  @ViewChild('userInput', { static: true }) user!: ElementRef;
  @ViewChild('passInput', { static: true }) pass!: ElementRef;

  constructor(public fb: FormBuilder, public router: Router, public alertController: AlertController) {

  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.loginJqueryValidate();
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async loginUser() {
      const userValue = this.user.nativeElement.value;
      const passValue = this.pass.nativeElement.value;

      // if(!userValue?.trim() || !passValue?.trim()){
      //   const alert = await this.alertController.create({
      //     header: 'Datos incompletos',
      //     message: 'Debe de llenar todos los campos.',
      //     buttons: ['Aceptar'],
      //   });
  
      //   await alert.present();
      //   return;
      // }

      // if (userValue == 'diego' && passValue == '1234') {
      //   console.log(`Login Exitoso - ${userValue} ${passValue}`);
      // } else {
      //     const alert = await this.alertController.create({
      //       header: 'Credenciales inválidas',
      //       message: 'Nombre de usuario y/o contraseña incorrectos.',
      //       buttons: ['Aceptar'],
      //     });
    
      //     await alert.present();
      //     return;
      // }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  loginJqueryValidate(): void {
    $(document).ready(() => {
      // Mostrar/ocultar la contraseña
      $('#togglePassword').click(() => {
        const passInput = $('#pass');
        const passType = passInput.attr('type') === 'password' ? 'text' : 'password';
        passInput.attr('type', passType);
        $('#toggleIcon').text(passType === 'password' ? 'visibility_off' : 'visibility');
      });
  
      // Validar formulario al hacer clic en "Iniciar Sesión"
      $('#loginButton').click(async () => {
        const userValue = $('#user').val();
        const passValue = $('#pass').val();
        let userStorage = null;
        let passStorage = null;

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userObject = JSON.parse(storedUser);
          userStorage = userObject.userName;
          passStorage = userObject.password;
        }
  
        // Validar si los campos están vacíos
        if (!userValue || !passValue) {
          const alert = await this.alertController.create({
            header: 'Datos incompletos',
            message: 'Debe de llenar todos los campos.',
            buttons: ['Aceptar'],
          });
          await alert.present();
          return;
        }
  
        // Validar credenciales
        if (userValue === userStorage && passValue === passStorage) {
        } else {
          const alert = await this.alertController.create({
            header: 'Credenciales Inválidas',
            message: 'Nombre de usuario y/o contraseña incorrectos.',
            buttons: ['Aceptar'],
          });
          await alert.present();
          return;
        }
      });
    });
  }
  
}
