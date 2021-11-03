import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth.guard'
import { ListarApiComponent } from './components/listar-api/listar-api.component';
import { AdicionarApiComponent } from './components/adicionar-api/adicionar-api.component';
import { ListarTelaComponent } from './components/listar-tela/listar-tela.component';
import { AdicionarTelaComponent } from './components/adicionar-tela/adicionar-tela.component';
import { DecrypterComponent } from './components/decrypter/decrypter.component';
import { EditApiComponent } from './components/edit-api/edit-api.component';
import { EditTelaComponent } from './components/edit-tela/edit-tela.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'listar-api', pathMatch: 'full' },
      { path: 'listar-api', component: ListarApiComponent },
      { path: 'edit-api', component: EditApiComponent},
      { path: 'adicionar-api', component: AdicionarApiComponent },
      { path: 'listar-tela', component: ListarTelaComponent},
      { path: 'adicionar-tela', component: AdicionarTelaComponent},
      { path: 'edit-tela', component: EditTelaComponent},
      { path: 'decrypter', component: DecrypterComponent}


    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
