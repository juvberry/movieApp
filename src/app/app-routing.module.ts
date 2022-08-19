import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      isParent: true
    }
  },
  { 
    path: 'home-details/:id',
    loadChildren: () => import('./features/home-details/home-details.module').then(m => m.HomeDetailsModule),
    data: {
      isParent: false
    }
  },
  {
    path: '?page=:page',
    redirectTo: '/',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
