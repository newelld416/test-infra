import { EnvAdminComponent } from './env-admin/env-admin.component';
import { SearchForceComponent } from '@app/search-force/search-force.component';
import { HomeComponent } from '@app/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { extract } from '@app/core';
import { EcsComponent } from '@app/ecs/ecs.component';
import { KafkaComponent } from '@app/kafka/kafka.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { KeepComponent } from '@app/keep/keep.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: extract('HOME') }
  },
  {
    path: 'ecs',
    component: EcsComponent,
    data: { title: extract('ECS') },
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'ecs/:cluster/:service',
    component: EcsComponent,
    data: { title: extract('Ecs') },
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'kafka',
    component: KafkaComponent,
    data: { title: extract('KAFKA') },
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'keep',
    component: KeepComponent,
    data: { title: extract('KEEP') },
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'search-force',
    component: SearchForceComponent,
    data: { title: extract('SEARCH FORCE') },
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'env-admin',
    component: EnvAdminComponent,
    data: { title: extract('ENVIORNMENT ADMIN') },
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },

  // This must be defined as the final route
  {
    path: '**',
    redirectTo: '/home'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
