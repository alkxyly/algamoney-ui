import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../seguranca/auth.guard";
import { PesquisaPessoaComponent } from "./pesquisa-pessoa/pesquisa-pessoa.component";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";

const routes: Routes = [
    { path: 'pessoas', 
      component: PesquisaPessoaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_PESSOA']}
    },
    { path: 'pessoas/novo',
      component: PessoaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_PESSOA']}
    },
    { path: 'pessoas/:codigo', 
      component: PessoaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_PESSOA']}
    }
]

@NgModule({   
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PessoasRoutingModule { }