import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { EcsComponent } from '@app/ecs/ecs.component';
import { EcsService } from '@app/services/ecs/ecs.service';
import { ServiceOverviewComponent } from './service-overview/service-overview.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EcsComponent,
    ServiceOverviewComponent
  ],
  providers: [
    EcsService
  ]
})
export class EcsModule { }
