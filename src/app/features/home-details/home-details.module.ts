import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDetailsRoutingModule } from './home-details-routing.module';
import { HomeDetailsComponent } from './home-details.component'
import { HomeComponent } from '../home/home.component';


@NgModule({
  declarations: [
    HomeDetailsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeDetailsRoutingModule
  ]
})
export class HomeDetailsModule { }
