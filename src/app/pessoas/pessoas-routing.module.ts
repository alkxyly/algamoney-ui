import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PesquisaPessoaComponent } from "./pesquisa-pessoa/pesquisa-pessoa.component";

const routes: Routes = [
    { path: 'pessoas', component: PesquisaPessoaComponent},
]

@NgModule({   
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PessoasRoutingModule { }