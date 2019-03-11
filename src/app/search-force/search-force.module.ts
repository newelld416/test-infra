import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { SearchForceComponent } from '@app/search-force/search-force.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    SearchForceComponent
  ],
  providers: [ ]
})
export class SearchForceModule { }
