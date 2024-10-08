import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';  // La URL de la API externa

  constructor(private http: HttpClient) {}

  // Método para realizar una petición GET a la API
  getData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });

    return this.http.get(this.apiUrl, { headers });
  }

  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  getUserByUserName(userName: string) {
    return this.http.get(`${this.apiUrl}/users/?userName=${userName}`);
  }

  getUserByFullName(fullName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/?fullName_like=${fullName}`);
  }

  // Método para hacer una petición POST
  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
