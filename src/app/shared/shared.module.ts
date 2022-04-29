import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BtnFilterComponent } from './components/btn/btn-filter/btn-filter.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { HeaderModule } from './header/header.module';


const Components = [
  BtnFilterComponent,
]

const MaterialModules = [
  MatButtonModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [
    Components,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MaterialModules
  ],
  exports: [
    Components,
    MaterialModules,
    HeaderModule
  ]
})
export class SharedModule { }
