import { CanActivateFn, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = sessionStorage.getItem('isAuthenticated'); // Verifica si hay un usuario logueado mediante sessionStorage
    
    if (user === 'true') {
      console.log("canactivate " + user);
      return true; // Si el usuario está logueado, permite acceso
    } else {
      console.log("canactivate " + user);
      this.router.navigate(['']); // Si no está logueado, redirige a login
      return false;
    }
  }
}