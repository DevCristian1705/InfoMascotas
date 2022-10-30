import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { FormularioComponent } from './formulario/formulario.component';
import { LandingComponent } from './landing/landing.component'; 

const routes: Routes = [
  {
    path: 'landing',
    component : LandingComponent, 
  }, 
  {
    path: 'form',
    component : FormularioComponent, 
  }, 
  {
    path: '', 
    redirectTo: 'landing',  
  }, 
  {
    path: '**',
    redirectTo: 'landing',
    pathMatch: 'full'
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
