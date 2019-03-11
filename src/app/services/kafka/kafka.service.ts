import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { Service } from '@app/models/service.model';
import { KafkaContent } from '@app/models/kafka-content.model';
import { environment } from '@env/environment';

const routes = {
  kafkaTopicsRoute: (c: KafkaContext) => {
    const url = `${environment.kafkaUtilitiesUrl}/topics`;
    console.log(url);
    return url;
  },
  createConsumerRoute: (c: KafkaContext) => {
    const url = `${environment.kafkaUtilitiesUrl}/consumer/test`;
    console.log(url);
    return url;
  },
  subscribeConsumerRoute: (c: KafkaContext) => {
    const url = `${environment.kafkaUtilitiesUrl}/consumer/test`;
    console.log(url);
    return url;
  },
  dataConsumerRoute: (c: KafkaContext) => {
    const url = `${environment.kafkaUtilitiesUrl}/consumer/test`;
    console.log(url);
    return url;
  },
  deleteConsumerRoute: (c: KafkaContext) => {
    const url = `${environment.kafkaUtilitiesUrl}/consumer/test`;
    console.log(url);
    return url;
  },
};

export interface KafkaContext {
  topic?: String;
}

@Injectable()
export class KafkaService {
  dataTemp: any = [];
  service: Service;
  constructor(private httpClient: HttpClient) { }

  getTopics(context: KafkaContext): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient
      .cache()
      .disableApiPrefix()
      .get(routes.kafkaTopicsRoute(context), httpOptions)
      .pipe(
        map((body: any) => {
          return body;
        }),
        catchError(() => of('Error, could not load kafka topics data :-('))
      );
  }

  getContent(context: KafkaContext): Observable<String | KafkaContent> {

    // TODO: must complete the following routes
    // 1) Create the consumer
    // 2) Subscribe the consumer to a topic
    // 3) Consume the data from the topic
    // 4) Delete the consumer

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient
      .cache()
      .disableApiPrefix()
      .post(routes.createConsumerRoute(context), httpOptions)
      .pipe(
        map((body: KafkaContent) => {
          return body;
        }),
        catchError(() => of('Error, could not load kafka topics data :-('))
      );
  }

}
