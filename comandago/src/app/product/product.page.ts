import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
