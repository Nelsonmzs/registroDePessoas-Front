import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {routing} from './../app.routes';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './pessoa/cadastro/cadastro.component';
import { ConsultaComponent } from './pessoa/consulta/consulta.component';


import { ConfigService } from '../app/services/config.service';
import { PessoaService } from '../app/services/pessoa.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    CadastroComponent,
    ConsultaComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [ConfigService, PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
