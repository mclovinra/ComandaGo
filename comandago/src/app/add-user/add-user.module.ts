import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddUserPage } from './add-user.page';
import { AddUserPageRoutingModule } from './add-user-routing.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddUserPage]
})
export class AddUserPageModule {}
