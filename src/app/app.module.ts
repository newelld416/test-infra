import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { EcsModule } from './ecs/ecs.module';
import { KafkaModule } from './kafka/kafka.module';
import { HomeModule } from './home/home.module';
import { KeepModule } from './keep/keep.module';
import { SearchForceModule } from './search-force/search-force.module';
import { EnvAdminModule } from './env-admin/env-admin.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {MaterialModule} from './material.module';

import {
  OktaAuthModule,
  OktaAuthGuard
} from '@okta/okta-angular';

import { environment } from '@env/environment';

@NgModule({
  imports: [
    // Material Modules
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,

    // Other
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    EcsModule,
    KafkaModule,
    KeepModule,
    SearchForceModule,
    EnvAdminModule,
    HomeModule,
    AppRoutingModule,
    OktaAuthModule.initAuth(environment.oktaConfig)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    OktaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
