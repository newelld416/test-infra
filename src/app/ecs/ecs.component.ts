import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { EcsService } from '@app/services/ecs/ecs.service';
import { Schema, CellType } from '../models/schema.model';

import * as _ from 'lodash';

const SEARCH_RESULTS_SCHEMA = [
  {
    title: 'Cluster',
    property: 'cluster',
    type: CellType.Data,
    filter: true
  },
  {
    title: 'Service',
    property: 'service',
    type: CellType.Data,
    filter: true
  },
  {
    title: 'Details',
    property: 'link',
    type: CellType.Link,
    filter: false
  }
];

@Component({
  selector: 'app-ecs',
  templateUrl: './ecs.component.html',
  styleUrls: ['./ecs.component.scss']
})
export class EcsComponent implements OnInit {
  dataSet: Array<any> = [];
  filteredData: Array<any> = [];
  resultSchema: Schema[];
  isLoading: boolean;
  cluster: String;
  service: String;
  environment: String;
  clusterSelected: Boolean;
  cellTypes = CellType;

  constructor(private ecsService: EcsService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Set Necessary URI Paramaters
    this.isLoading = true;
    this.resultSchema = SEARCH_RESULTS_SCHEMA;

    this.route.params.subscribe(params => {
      this.cluster = params['cluster'];
      this.service = params['service'];
      this.clusterSelected = this.cluster ? true : false;

      if (!this.clusterSelected) {
        // Get all services from ECS
        this.ecsService.listServices({ environment: null, cluster: null, service: null })
          .pipe(finalize(() => {
            this.isLoading = false;
            this.filteredData = this.dataSet;
          }))
          .subscribe((response: [any]) => {
            for (const index of JSON.parse(JSON.stringify(response))) {
              this.dataSet.push(index);
            }
          });
      }
    });
  }

  clearSearch() {
    this.filterData(null, null, null);
  }

  filterData(cluster: String, service: String, environment: String) {
    this.filteredData = this.dataSet;
    if (cluster) {
      this.filteredData = this.filteredData.filter(
        obj => obj.cluster.toLowerCase().includes(cluster.toLowerCase())
      );
    }

    if (service) {
      this.filteredData = this.filteredData.filter(
        obj => obj.service.toLowerCase().includes(service.toLowerCase())
      );
    }

    if (environment) {
      this.filteredData = this.filteredData.filter(
        obj => obj.service.toLowerCase().includes(environment.toLowerCase())
      );
    }
  }

  /**
   * Gets value from results by property
   * @param {(any)} data
   * @param {string} property
   * @returns {string}
   * @memberof TableComponent
   */
  getValue(data: any, property: string): string {
    return _.get(data, property, '');
  }
}
