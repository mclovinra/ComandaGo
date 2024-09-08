import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecoverypassPageRoutingModule } from './recoverypass-routing.module';
import { RecoverypassPage } from './recoverypass.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    RecoverypassPageRoutingModule
  ],
  declarations: [RecoverypassPage]
})
export class RecoverypassPageModule {}
