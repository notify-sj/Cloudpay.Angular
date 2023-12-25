import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { AuthGuard } from '@guards/auth.guard';

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
                path: 'shared',
                loadChildren: () => import('@modules/shared/shared.module').then(m => m.SharedModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('@modules/profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'admin',
                loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule)
            },
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'system',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
