import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDetailsRoutingModule } from './home-details-routing.module';
import { HomeDetailsComponent } from './home-details.component'
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomeDetailsComponent,
  ],
  imports: [
    CommonModule,
    HomeDetailsRoutingModule,
    SharedModule
  ]
})
export class HomeDetailsModule { }
