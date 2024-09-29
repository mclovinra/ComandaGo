import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [{ title: 'Inbox', url: '/folder/inbox', icon: 'mail' },];
  public labels = [];
  constructor(public menu: MenuController, private router: Router) {this.checkAuthentication();}
  isAuthenticated: boolean = false;

  checkAuthentication() {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    this.isAuthenticated = authStatus === 'true';
  }
  logout() {
    this.menu.close();
    
    console.log('Sesión cerrada');
    
    this.router.navigate(['/login']);
  }
}
