import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {WebLayoutComponent} from './layouts/web-layout/web-layout.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./modules/web/web.module').then( m => m.WebModule)
    }]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./modules/admin/admin.module').then( m => m.AdminModule)
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
