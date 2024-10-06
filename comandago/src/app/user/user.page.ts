import { ApiService } from './../services/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  userName: string;
  fullName: string;
  email: string;
}


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {
  filteredUsers: User[] = [];
  searchQuery: string = '';
  find: boolean = false;
  
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  onInputChange(event: any) {
    this.searchQuery = event.target.value; // Actualizar la variable con el valor del input
  }

  
  // Función para buscar usuarios
  searchUser() {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = [];
      this.find = false;
      return;
    }

    this.apiService.getUserByFullName(this.searchQuery).subscribe(
      (data: User[]) => {
        this.filteredUsers = data;
        this.find = data.length > 0;
      },
      (error) => {
        console.error('Error al buscar el usuario:', error);
        this.filteredUsers = [];
        this.find = false;
      }
    );
  }

  // Navegar a la página para agregar un nuevo usuario
  navigateToAddUser() {
    this.router.navigate(['/add-user']);
  }

}
