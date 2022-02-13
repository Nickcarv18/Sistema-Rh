import { VagasComponent } from './pages/vagas/vagas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'vagas',  loadChildren: () => import('./pages/vagas/vagas.module').then(m => m.VagasModule) },
  { path: '**',  redirectTo: '/vagas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
