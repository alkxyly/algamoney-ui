import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PesquisaPessoaComponent } from "./pesquisa-pessoa/pesquisa-pessoa.component";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";

const routes: Routes = [
    { path: 'pessoas', component: PesquisaPessoaComponent},
    { path: 'pessoas/novo', component: PessoaCadastroComponent},
    { path: 'pessoas/:codigo', component: PessoaCadastroComponent}
]

@NgModule({   
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PessoasRoutingModule { }