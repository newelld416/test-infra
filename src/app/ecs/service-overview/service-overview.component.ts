import { ServiceEdit } from '@app/models/service.model';
import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Service } from '../../models/service.model';
import { EcsService } from '@app/services/ecs/ecs.service';
import { Schema, CellType } from '../../models/schema.model';

import { environment } from '@env/environment';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

const SEARCH_RESULTS_SCHEMA = [
  {
    title: 'Created Timestamp',
    property: 'createdAt',
    type: CellType.Data,
    filter: false
  },
  {
    title: 'Message',
    property: 'message',
    type: CellType.Data,
    filter: false
  }
];

@Component({
  selector: 'app-service-overview',
  templateUrl: './service-overview.component.html',
  styleUrls: ['./service-overview.component.scss']
})
export class ServiceOverviewComponent implements OnInit {
  @Input() cluster: String;
  @Input() service: String;

  isLoading: boolean;
  serviceDetail: Service = <Service>{};
  resultSchema: Schema[];
  cloudWatchUrl: String;
  events: Array<any> = [];
  tags: String;
  serviceNameShort: String;

  constructor(private ecsService: EcsService) { }

  ngOnInit() {
    this.resultSchema = SEARCH_RESULTS_SCHEMA;
    this.isLoading = true;
    this.populateServices();
  }

  populateServices() {
    // Get all services from ECS
    this.ecsService.describeServices({ environment: null, cluster: this.cluster, service: this.service })
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe((response: Service) => {
        // Get the service Detail
        this.serviceDetail = response;

        // Build the events array
        this.events = this.serviceDetail.events;

        // Build the tags string
        this.tags = 'No Tags Available';
        if (this.serviceDetail.tags && this.serviceDetail.tags.length > 1) {
          this.tags = '';
          for (let i = 0; i < this.serviceDetail.tags.length; i++) {
            this.tags += this.serviceDetail.tags[i].value + ', ';
          }
          this.tags = this.tags.substring(0, this.tags.length - 2);
        }

        // Dynamically build the cloudwatch URL
        this.cloudWatchUrl = `${environment.cloudWatchDomain}${this.serviceDetail.serviceName}-ECSLogGroup`;
      });
  }

  startService(desiredCountValue: any) {

    const body = [
      {
        cluster: this.getClusterName(this.serviceDetail.clusterArn),
        services: [
          {
            serviceName: this.serviceDetail.serviceName,
            desiredCount: +desiredCountValue ? +desiredCountValue : 1
          }
        ]
      }
    ];

    this.ecsService.startServices({ applyChanges: environment.applyChanges }, body)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.populateServices();
      }))
      .subscribe((response: ServiceEdit) => {
        console.log(response);
      });
  }

  stopService() {
    const body = [
      {
        cluster: this.getClusterName(this.serviceDetail.clusterArn),
        services: [
          {
            serviceName: this.serviceDetail.serviceName,
            desiredCount: 0
          }
        ]
      }
    ];
    this.ecsService.stopServices({ applyChanges: environment.applyChanges }, body)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.populateServices();
      }))
      .subscribe((response: ServiceEdit) => {
        console.log(response);
      });
  }

  private getClusterName(clusterArn: string): string {
    return clusterArn.split('/')[1];
  }

}
