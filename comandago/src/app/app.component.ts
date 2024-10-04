import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [{ title: 'Inbox', url: '/folder/inbox', icon: 'mail' },];
  public labels = [];
  constructor(public menu: MenuController, private router: Router, private navCtrl: NavController) {this.checkAuthentication();}
  isAuthenticated: boolean = false;

  checkAuthentication() {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    this.isAuthenticated = authStatus === 'true';
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToOrder() {
    this.router.navigate(['/order']);
  }

  navigateToProduct() {
    this.router.navigate(['/product']);
  }

  logout() {
    this.menu.close();
    sessionStorage.setItem('isAuthenticated', 'false');
    this.isAuthenticated = false;
    console.log('Sesión cerrada');
    
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
