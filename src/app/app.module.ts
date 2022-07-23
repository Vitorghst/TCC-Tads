import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListaApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';







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
import { EditApiComponent } from './components/edit-api/edit-api.component';
import { EditTelaComponent } from './components/edit-tela/edit-tela.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './home/home.component';
import { ReviewsComponent } from './components/reviews/reviews.component';







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
    EditApiComponent,
    EditTelaComponent,
    HomeComponent,
    ReviewsComponent,

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    CommonModule,
    BrowserAnimationsModule

  ],
  providers: [ListaApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
