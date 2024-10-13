import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  userForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
              private apiService: ApiService, 
              private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: ['', []],
      userName: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['userEdit'] != null) {
      const userEdit = navigation.extras.state['userEdit'];
      
      this.userForm.patchValue({
        id: userEdit.id,
        userName: userEdit.userName,
        fullName: userEdit.fullName,
        email: userEdit.email,
        password: userEdit.password
      });
    } else {
      console.log('No hay usuario');
    }
  }

  async onEditUser() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;

      this.apiService.editUser(newUser).subscribe(async response => {
        console.log('Usuario añadido exitosamente', response);

        // Crear y mostrar el alert
        const alert = await this.alertController.create({
          header: 'Usuario Editado',
          message: 'El Usuario ' + newUser.fullName + ' ha sido editado con éxito.',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/add-user']).then(() => {
                  window.location.reload();
                });
              }
            }
          ],
        });

        await alert.present();

      }, async error => {
        console.error('Error al añadir el usuario', error);
        const alert = await this.alertController.create({
          header: 'Error de Usuario',
          message: 'Error al añadir el usuario ' +  error,
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
              }
            }
          ],
        });
      });
    }
  }

  navigateToUser() {
    this.router.navigate(['/user']);
  }

}
