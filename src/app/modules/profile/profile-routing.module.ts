import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AddressComponent } from './components/address/address.component';
import { BlankComponent } from '@modules/shared/components/blank/blank.component';
import { DocumentComponent } from './components/document/document.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'address/:id',
        component: AddressComponent,
      },
      {
        path: 'document/:id',
        component: DocumentComponent,
      },
      {
        path: '**',
        component: BlankComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
