import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuariosComponent} from './Pages/Usuarios/Usuarios.component';
import {TipoIdentificacionComponent} from './Pages/TipoIdentificacion/TipoIdentificacion.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'tipoidentificacion', component: TipoIdentificacionComponent },
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
