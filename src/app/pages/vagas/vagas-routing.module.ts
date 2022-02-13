import { VagasComponent } from './vagas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormVagasComponent } from './form-vagas/form-vagas.component';

const routes: Routes = [
  {path: '',  component: VagasComponent },
  {path: 'cadastrar',  component: FormVagasComponent },
  {path: 'atualizar/:vagaId',  component: FormVagasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VagasRoutingModule { }
