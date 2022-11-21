import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {WebLayoutComponent} from './layouts/web-layout/web-layout.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {ClientLayoutComponent} from './layouts/client-layout/client-layout.component';
import {InvoiceLayoutComponent} from './layouts/invoice-layout/invoice-layout.component';
import {CleanerLayoutComponent} from './layouts/cleaner-layout/cleaner-layout.component';

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
  {
    path: 'cleaner',
    component: CleanerLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./modules/cleaner/cleaner.module').then( m => m.CleanerModule)
    }]
  },
  {
    path: 'client',
    component: ClientLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./modules/client/client.module').then( m => m.ClientModule)
    }]
  },
  {
    path: 'invoice',
    component: InvoiceLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./modules/invoice/invoice.module').then( m => m.InvoiceModule)
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
