import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollapseComponent } from './collapse/collapse.component';
import { LoaderComponent } from './loader/loader.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TableComponent } from './table/table.component';
import { AccordionComponent } from './accordion/accordion.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OktaAuthService } from '@okta/okta-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  declarations: [
    LoaderComponent,
    PaginationComponent,
    TableComponent,
    CollapseComponent,
    AccordionComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  exports: [
    LoaderComponent,
    PaginationComponent,
    TableComponent,
    CollapseComponent,
    AccordionComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  providers: [
    OktaAuthService
  ]
})
export class SharedModule { }
