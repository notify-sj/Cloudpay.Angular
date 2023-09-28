import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { QueryParamResolver } from '@services/query-param-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve:{
      queryParams: QueryParamResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
