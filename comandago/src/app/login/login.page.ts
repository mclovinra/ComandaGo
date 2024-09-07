import { ChangeDetectionStrategy, signal, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

  @ViewChild('userInput', { static: true }) user!: ElementRef;
  @ViewChild('passInput', { static: true }) pass!: ElementRef;

  constructor(public fb: FormBuilder, public router: Router) {
    this.formularioLogin = this.fb.group({
      'user': new FormControl("", Validators.required),
      'pass': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    setTimeout(() => {

      const userValue = this.user.nativeElement.value;
      const passValue = this.pass.nativeElement.value;

      if (userValue == 'diego' && passValue == '1234') {
        console.log(`Login Exitoso - ${userValue} ${passValue}`);
      } else {
        console.log(`Credenciales incorrectas - ${userValue} ${passValue}`);
      }
    },0);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
