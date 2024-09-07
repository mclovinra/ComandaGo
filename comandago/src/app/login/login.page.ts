import { ChangeDetectionStrategy, signal, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { addIcons } from "ionicons";

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
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  hide = signal(true);

  constructor(public fb: FormBuilder, public router: Router) {
    this.formularioLogin = this.fb.group({
      'user': new FormControl("", Validators.required),
      'pass': new FormControl("", Validators.required)
    });

    console.log('Usuario:',);
    console.log('Contraseña:',);
  }
  ngOnInit() {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    const user = this.formularioLogin.get('user')?.value;
    const pass = this.formularioLogin.get('pass')?.value;
    
    console.log('Usuario:', this.formularioLogin);
    console.log('Contraseña:', pass);
  
    if (user == 'diego' && pass == 'diego') {
      console.log('Login exitoso');
    } else {
      console.log(`Credenciales incorrectas  - ${user} ${pass} -`);
    }
  }
  
  goToRegister(){
    this.router.navigate(['/register'])
  }

}