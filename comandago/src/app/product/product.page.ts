import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { AlertController } from '@ionic/angular';

export interface Product {
  id: number;
  productName: string;
  price: number;
  stock: number;
  active: boolean;
  type: string;
  showOptions?: boolean;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  constructor(private router: Router, 
              private apiService: ApiService, 
              private alertController: AlertController) { }

  ngOnInit() {
  }

  ToAddProduct() {
    this.router.navigate(['/add-product']);
  }
}
