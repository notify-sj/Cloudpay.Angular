import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { AuthGuard } from '@guards/auth.guard';
import { BlankComponent } from '@pages/blank/blank.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [            
            {
                path: 'self',
                loadChildren: () => import('@modules/self/self.module').then(m => m.SelfModule)
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
              path: '',
              redirectTo: '',
              pathMatch: 'full'
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
