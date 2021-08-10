import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);

const mainLayoutModule = () =>
  import('./main-layout/main-layout.module').then((x) => x.MainLayoutModule);

const routes: Routes = [
  {
    path: '',
    loadChildren: mainLayoutModule,
    canActivate: [AuthGuard],
  },
  { path: 'account', loadChildren: accountModule },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
