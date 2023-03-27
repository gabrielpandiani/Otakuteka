import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './componentes/nav/nav.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TekaCompletaComponent } from './componentes/teka-completa/teka-completa.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnimeComponent } from './componentes/anime/anime.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ValoracionComponent } from './componentes/valoracion/valoracion.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    InicioComponent,
    TekaCompletaComponent,
    LoginComponent,
    AnimeComponent,
    ValoracionComponent,
    ContactoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
