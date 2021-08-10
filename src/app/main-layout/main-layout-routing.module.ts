import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { HomeComponent } from '../home/home.component';
import { CreateItemComponent } from '../create-item/create-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'create-item', component: CreateItemComponent },
      { path: 'edit/:id', component: EditItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
