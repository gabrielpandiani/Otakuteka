import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { TekaCompletaComponent } from './componentes/teka-completa/teka-completa.component';


const routes: Routes = [{path:'', component: InicioComponent},{path:'teka-completa', component: TekaCompletaComponent},{path:'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
