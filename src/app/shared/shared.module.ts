import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';

import { HeaderModule } from './header/header.module';
import { YouTubePlayerModule } from "@angular/youtube-player"

const Core = [
  RouterModule,
  HttpClientModule,
]

const Components = [
]

const MaterialModules = [
  MatButtonModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSliderModule,
  MatIconModule
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MaterialModules,
    RouterModule,
    YouTubePlayerModule
  ],
  exports: [
    MaterialModules,
    HeaderModule,
    Core,
    YouTubePlayerModule
  ]
})
export class SharedModule { }
