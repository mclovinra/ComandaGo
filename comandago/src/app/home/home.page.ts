import { Component, OnInit, Injectable  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink, CanActivate } from '@angular/router';
import { IonHeader, IonButtons, IonButton, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonFooter, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonTitle, IonToolbar, IonButton, IonButtons, IonHeader, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
})
export class HomePage implements OnInit {

  constructor(public router: Router) { }

  userName: string = '';

  ngOnInit() {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      this.userName = userObject.userName || 'Usuario';
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    
    this.router.navigate(['/login']);
  }

}
