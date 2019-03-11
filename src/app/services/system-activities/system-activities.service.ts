import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { Service } from '@app/models/service.model';
import { environment } from '@env/environment';

const routes = {
  getSystems: (c: SystemActivitiesContext) => {
    const url = `${environment.systemActivitiesUrl}/get-systems/${c.activity}`;
    console.log(url);
    return url;
  },
  startSystems: (c: SystemActivitiesContext) => {
    const url =
      `${environment.systemActivitiesUrl}/start-systems/${c.activity}?applyChanges=${environment.applyChanges}`;
    console.log(url);
    return url;
  },
  stopSystems: (c: SystemActivitiesContext) => {
    const url =
      `${environment.systemActivitiesUrl}/stop-systems/${c.activity}?applyChanges=${environment.applyChanges}`;
    console.log(url);
    return url;
  },
};

export interface SystemActivitiesContext {
  activity?: String;
}

@Injectable()
export class SystemActivitiesService {
  dataTemp: any = [];
  service: Service;
  constructor(private httpClient: HttpClient) { }

  getSystems(context: SystemActivitiesContext): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.dataTemp = [];

    return this.httpClient
      .cache()
      .disableApiPrefix()
      .get(routes.getSystems(context), httpOptions)
      .pipe(
        map((body: any) => {
          for (let i = 0; i < body.length; i++) {
            if (body[i] && body[i].services.length > 0) {
              const statusRatio = body[i].runningTasks / body[i].desiredTasks;
              let status = 'Active';
              if (statusRatio === 0) {
                status = 'Inactive';
              } else if (statusRatio > 0 && statusRatio > 1) {
                status = 'Pending';
              }
              this.dataTemp.push({
                cluster: body[i].cluster,
                status: status,
                services: body[i].services
              });
            }
          }
          return this.dataTemp;
        }),
        catchError(() => of('Error, could not load service activities data :-('))
      );
  }

  startSystems(context: SystemActivitiesContext, body: any): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient
      .cache()
      .disableApiPrefix()
      .post<any>(routes.startSystems(context), body, httpOptions)
      .pipe(
        map((returnBody: any) => returnBody),
        catchError(() => of('Error, could not start the systems :-('))
      );
  }

  stopSystems(context: SystemActivitiesContext, body: any): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient
      .cache()
      .disableApiPrefix()
      .post<any>(routes.stopSystems(context), body, httpOptions)
      .pipe(
        map((returnBody: any) => returnBody),
        catchError(() => of('Error, could not stop the systems :-('))
      );
  }
}
