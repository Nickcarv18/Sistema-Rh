import { FlexLayoutModule } from '@angular/flex-layout';
import { VagasComponent } from './vagas.component';
import { MaterialModule } from './../../shared/material.module';
import { VagasRoutingModule } from './vagas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormVagasComponent } from './form-vagas/form-vagas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ VagasComponent, FormVagasComponent ],
  imports: [
    CommonModule,
    VagasRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VagasModule { }
