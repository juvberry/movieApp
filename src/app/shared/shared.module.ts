import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { BtnFilterComponent } from './components/btn/btn-filter/btn-filter.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

import { HeaderModule } from './header/header.module';

const Core = [
  RouterModule,
  HttpClientModule,
]

const Components = [
  BtnFilterComponent,
]

const MaterialModules = [
  MatButtonModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSliderModule
]

@NgModule({
  declarations: [
    Components,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MaterialModules,
    RouterModule
  ],
  exports: [
    Components,
    MaterialModules,
    HeaderModule,
    Core
  ]
})
export class SharedModule { }
