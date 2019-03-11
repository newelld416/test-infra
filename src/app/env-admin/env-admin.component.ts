import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SystemActivitiesService } from '@app/services/system-activities/system-activities.service';
import { finalize } from 'rxjs/operators';
import { Schema, CellType } from '@app/models/schema.model';

import * as _ from 'lodash';

const ACTIVE_STATUS = 'Active';

const SEARCH_RESULTS_SCHEMA = [
  {
    title: 'Cluster',
    property: 'cluster',
    type: CellType.Data,
    filter: true
  },
  {
    title: 'Status',
    property: 'status',
    type: CellType.Data,
    filter: true
  },
  {
    title: 'Start',
    property: 'link',
    type: CellType.Link,
    filter: false
  },
  {
    title: 'Stop',
    property: 'link',
    type: CellType.Link,
    filter: false
  }
];
@Component({
  selector: 'app-env-admin',
  templateUrl: './env-admin.component.html',
  styleUrls: ['./env-admin.component.scss']
})
export class EnvAdminComponent implements OnInit {
  isLoading: boolean;
  resultSchema: Schema[];
  dataSet: Array<any> = [];
  selectedConfiguration: string;
  cellTypes = CellType;

  constructor(private systemActivitiesService: SystemActivitiesService, private route: ActivatedRoute) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.populateSystems();
  }

  populateSystems() {
    this.dataSet = [];
    this.isLoading = true;
    const configuration = this.selectedConfiguration  ? this.selectedConfiguration : 'qa-refresh';
    this.systemActivitiesService.getSystems({ activity: configuration })
      .pipe(finalize(() => {
        this.isLoading = false;
        this.resultSchema = SEARCH_RESULTS_SCHEMA;
      }))
      .subscribe((response: [any]) => {
        for (const index of JSON.parse(JSON.stringify(response))) {
          this.dataSet.push(index);
        }
      });
  }

  /**
   * checks if item is active
   * @param {string} value
   * @returns {boolean}
   * @memberof TableComponent
   */
  isActive(value: string): boolean {
    return value === ACTIVE_STATUS;
  }

  setSelectedConfiguration(configuration: string) {
    this.selectedConfiguration = configuration;
    this.populateSystems();
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

  /**
   * Filters the table
   * @param {(any)} value
   * @param {string} property
   * @memberof TableComponent
   */
  filterData(value: any, property: string) {
    this.populateSystems();
    this.dataSet = this.dataSet.filter(
      element => element[property].toLowerCase().includes(value.toLowerCase())
    );
  }

  startService(cluster: string) {
    const body = [cluster];

    this.systemActivitiesService.startSystems({ activity: this.selectedConfiguration }, body)
      .pipe(finalize(() => {
        this.populateSystems();
      }))
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  stopService(cluster: string) {
    const body = [cluster];

    this.systemActivitiesService.stopSystems({ activity: this.selectedConfiguration }, body)
      .pipe(finalize(() => {
        this.populateSystems();
      }))
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  stopAllServices() {
    this.getSystemClusters((body: any) => {
      this.systemActivitiesService.stopSystems({ activity: this.selectedConfiguration }, body)
      .pipe(finalize(() => {
        this.populateSystems();
      }))
      .subscribe((response: any) => {
        console.log(response);
      });
    });
  }

  private getSystemClusters(callback: any) {
    const tempArray = [];
    for (const element of this.dataSet) {
      tempArray.push(element.cluster);
    }
    callback(tempArray);
  }
}
