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
    const user = sessionStorage.getItem('user'); // Verifica si hay un usuario logueado mediante sessionStorage
    if (user) {
      return true; // Si el usuario está logueado, permite acceso
    } else {
      this.router.navigate(['/login']); // Si no está logueado, redirige a login
      return false;
    }
  }
}