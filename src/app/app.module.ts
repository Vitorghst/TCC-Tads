import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup'
import { HttpClientModule } from '@angular/common/http';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxStarRatingModule } from 'ngx-star-rating';
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
import { OrderComponent } from './components/order/order.component';
import { OrderItemsComponent } from './components/order/order-items/order-items.component';
import { DeliveryCostsComponent } from './components/order/delivery-costs/delivery-costs.component';
import { RadioComponent } from './components/radio/radio.component';
import { OrderSumaryComponent } from './components/order-sumary/order-sumary.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CadastroComponent } from './components/login/cadastro/cadastro.component';
import { PainelGerencimentoComponent } from './components/painel-gerencimento/painel-gerencimento.component';
import { GerenciamentoUsuariosComponent } from './components/painel-gerencimento/gerenciamento-usuarios/gerenciamento-usuarios.component';
import { SideMenuComponent } from './components/painel-gerencimento/side-menu/side-menu.component';
import { GerenciamentoPedidosComponent } from './components/painel-gerencimento/gerenciamento-pedidos/gerenciamento-pedidos.component';
import { Md5 } from 'ts-md5';
import { PedidosUsuariosComponent } from './components/pedidos-usuarios/pedidos-usuarios.component';
import { SideMenuPedidosComponent } from './components/pedidos-usuarios/side-menu-pedidos/side-menu-pedidos.component';








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
    OrderComponent,
    OrderItemsComponent,
    DeliveryCostsComponent,
    RadioComponent,
    OrderSumaryComponent,
    SnackbarComponent,
    CadastroComponent,
    PainelGerencimentoComponent,
    GerenciamentoUsuariosComponent,
    SideMenuComponent,
    GerenciamentoPedidosComponent,
    PedidosUsuariosComponent,
    SideMenuPedidosComponent,

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    DragDropModule,
    FormsModule,
    NgxStarRatingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgToastModule,
    CommonModule,
    BrowserAnimationsModule

  ],
  providers: [ListaApiService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
