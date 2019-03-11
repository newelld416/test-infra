import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { KeepComponent } from '@app/keep/keep.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    KeepComponent
  ],
  providers: [ ]
})
export class KeepModule { }
