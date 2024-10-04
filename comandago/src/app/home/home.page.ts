import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule
  ],
})
export class HomePage implements OnInit {

  isAuthenticated: boolean = false;
  user!: string;
  userApi: any = null;

  constructor(private router: Router, private apiService: ApiService, private menu: MenuController) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
    } else {
      console.log('No se encontraron datos de navegación.');
    }

    this.isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    this.apiService.getUserByUserName(this.user).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.userApi = data[0];
        }
        console.log('Usuario obtenido:', this.userApi);
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  ionViewWillLeave() {
    this.menu.enable(false);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
