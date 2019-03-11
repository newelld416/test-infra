
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { KafkaComponent, KafkaModalComponent } from './kafka.component';
import { KafkaService } from '@app/services/kafka/kafka.service';

import {
  MatCardModule,
  MatButtonModule,
  MatNativeDateModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    RouterModule
  ],
  entryComponents: [ KafkaModalComponent ],
  declarations: [
    KafkaComponent,
    KafkaModalComponent
  ],
  providers: [
    KafkaService
  ]
})
export class KafkaModule { }
