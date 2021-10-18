import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS} from '@angular/common/http'


import { ListaApiService } from './services/lista-api.service';
import { ListaTelaService } from './services/lista-tela.service';





import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { ListarApiComponent } from './components/listar-api/listar-api.component';
import { AdicionarApiComponent } from './components/adicionar-api/adicionar-api.component';
import { ListarTelaComponent } from './components/listar-tela/listar-tela.component';
import { AdicionarTelaComponent } from './components/adicionar-tela/adicionar-tela.component';
import { DecrypterComponent } from './components/decrypter/decrypter.component';
import { AdicionarApiService } from './services/adicionar-api.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ListarApiComponent,
    AdicionarApiComponent,
    ListarTelaComponent,
    AdicionarTelaComponent,
    DecrypterComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [ListaApiService, ListaTelaService, AdicionarApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
