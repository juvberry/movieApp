import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDetailsRoutingModule } from './home-details-routing.module';
import { HomeDetailsComponent } from './home-details.component'
import { SharedModule } from 'src/app/shared/shared.module';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { UtilServiceService } from 'src/app/services/utilService/util-service.service';

@NgModule({
  declarations: [
    HomeDetailsComponent,
  ],
  imports: [
    CommonModule,
    HomeDetailsRoutingModule,
    SharedModule,
    YouTubePlayerModule
  ],
  providers: [
    UtilServiceService
  ]
})
export class HomeDetailsModule { }
