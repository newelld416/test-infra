import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { Service, ServiceEdit } from '@app/models/service.model';
import { environment } from '@env/environment';

const routes = {
  listServices: (c: ECSContext) => {
    let url = `${environment.ecsUtilitiesUrl}/list-services?`;
    if (c.cluster) {
      url += `cluster=${c.cluster}`;
      if (c.environment) {
        url += `&environment=${c.environment}`;
      }
    } else {
      if (c.environment) {
        url += `environment=${c.environment}`;
      }
    }
    console.log(url);
    return url;
  },
  describeServices: (c: ECSContext) => {
    const url = `${environment.ecsUtilitiesUrl}/describe-service/${c.cluster}/${c.service}`;
    console.log(url);
    return url;
  },
  startServices: (c: ECSContext) => {
    const url = `${environment.ecsUtilitiesUrl}/start-services?applyChanges=${c.applyChanges}`;
    console.log(url);
    return url;
  },
  stopServices: (c: ECSContext) => {
    const url = `${environment.ecsUtilitiesUrl}/stop-services?applyChanges=${c.applyChanges}&forceStop=true`;
    console.log(url);
    return url;
  },
};

export interface ECSContext {
  environment?: String;
  cluster?: String;
  service?: String;
  applyChanges?: Boolean;
}

@Injectable()
export class EcsService {
  dataTemp: any = [];
  service: Service;
  constructor(private httpClient: HttpClient) { }

  listServices(context: ECSContext): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.dataTemp = [];

    return this.httpClient
      .cache()
      .disableApiPrefix()
      .get(routes.listServices(context), httpOptions)
      .pipe(
        map((body: any) => {
          for (let i = 0; i < body.length; i++) {
            const services = body[i].services;
            const cluster = body[i].cluster;
            if (services && services.length > 0) {
              for (let y = 0; y < services.length; y++) {
                const service: String = services[y];
                this.dataTemp.push({
                  cluster: cluster,
                  service: service,
                  link: `/ecs/${cluster}/${service}`
                });
              }
            }
          }
          console.log(this.dataTemp);
          return this.dataTemp;
        }),
        catchError(() => of('Error, could not load ecs data :-('))
      );
  }

  describeServices(context: ECSContext): Observable<String | Service> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient
      .cache()
      .disableApiPrefix()
      .get(routes.describeServices(context), httpOptions)
      .pipe(
        map((body: Service) => body),
        catchError(() => of('Error, could not load ecs data :-('))
      );
  }

  startServices(context: ECSContext, body: any): Observable<String | ServiceEdit> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient
      .cache()
      .disableApiPrefix()
      .post<any>(routes.startServices(context), body, httpOptions)
      .pipe(
        map((returnBody: ServiceEdit) => returnBody),
        catchError(() => of('Error, could not load ecs data :-('))
      );
  }

  stopServices(context: ECSContext, body: any): Observable<String | ServiceEdit> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient
      .cache()
      .disableApiPrefix()
      .post<any>(routes.stopServices(context), body, httpOptions)
      .pipe(
        map((returnBody: ServiceEdit) => returnBody),
        catchError(() => of('Error, could not load ecs data :-('))
      );
  }

}
