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
  allUsers : User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  find: boolean = false;
  
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  onInputChange(event: any) {
    this.searchQuery = event.target.value; // Actualizar la variable con el valor del input
  }

  searchUser() {
    this.apiService.getUsers().subscribe(
      (data: User[]) => {
        this.allUsers = data;
        this.filteredUsers = data;  // Al principio, no hay filtro, así que mostramos todos los usuarios
      
        if (this.searchQuery.trim() === '') {
          this.filteredUsers = this.allUsers;  // Si el input está vacío, mostramos todos los usuarios
          return;
        }
    
        // Filtrar los usuarios basándose en el nombre completo o username
        this.filteredUsers = this.allUsers.filter(user =>
          user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    
        // Controlar si se encontraron usuarios
        this.find = this.filteredUsers.length > 0;

      },
      (error) => {
        console.error('Error al traer los usuarios:', error);
        this.allUsers = [];
        this.filteredUsers = [];
      }
    );
  }

  // Navegar a la página para agregar un nuevo usuario
  ToAddUser() {
    this.router.navigate(['/add-user']);
  }

}
