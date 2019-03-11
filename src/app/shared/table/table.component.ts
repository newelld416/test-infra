import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Schema, CellType } from '../../models/schema.model';
import * as _ from 'lodash';

const ACTIVE_STATUS = 'Active';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() resultSchema: Schema;
  @Input() isScrollable: boolean;
  @Input() dataSet: any[];
  @Output() action = new EventEmitter();
  cellTypes = CellType;
  filteredDataSet: any[];

  ngOnInit() {
    this.populateData();
  }

  populateData() {
    this.filteredDataSet = this.dataSet;
  }
  /**
   * Emits action
   * @param {any} payload
   * @memberOf TableComponent
   */
  linkAction(payload: any): void {
    this.action.emit(payload);
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
    this.populateData();
    this.filteredDataSet = this.dataSet.filter(
      element => element[property].toLowerCase().includes(value.toLowerCase())
    );
  }
}
