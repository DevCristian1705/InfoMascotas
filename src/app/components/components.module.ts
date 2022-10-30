import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { LandingComponent } from './landing/landing.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormularioComponent } from './formulario/formulario.component'; 


@NgModule({
  declarations: [
    LandingComponent,
    FormularioComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule, 
    SharedModule,
    MaterialModule
  ], 
})
export class ComponentsModule { }
