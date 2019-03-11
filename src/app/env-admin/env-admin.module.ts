import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { EnvAdminComponent } from '@app/env-admin/env-admin.component';

import { SystemActivitiesService } from '@app/services/system-activities/system-activities.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    EnvAdminComponent
  ],
  providers: [
    SystemActivitiesService
  ]
})
export class EnvAdminModule { }
