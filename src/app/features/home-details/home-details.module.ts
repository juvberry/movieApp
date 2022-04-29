import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDetailsRoutingModule } from './home-details-routing.module';
import { HomeDetailsComponent } from './home-details.component'


@NgModule({
  declarations: [
    HomeDetailsComponent,
  ],
  imports: [
    CommonModule,
    HomeDetailsRoutingModule
  ]
})
export class HomeDetailsModule { }
