import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

const DEFAULT_OFFSET = 10;
const MAX_RESULTS_WINDOW = 10000;
const PAGES_DISPLAYED = 10;
const DEFAULT_PAGE_POSITION = 6;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() itemsCount: number;
  @Input() currentPage = 1;
  @Input() offset = DEFAULT_OFFSET;
  @Output() pageChange = new EventEmitter();
  totalPages: number;
  startPage: number;
  endPage: number;
  pages$: Observable<number[]>;

  ngOnInit() {
    this.itemsCount = parseInt(this.itemsCount as any, 10);
    this.currentPage = parseInt(this.currentPage as any, 10);
    this.offset = parseInt(this.offset as any, 10);
    /*Limit totalPages to 10,000/offset to conform to Elasticsearch max_results_window property
    which defaults to 10,000.*/
    this.totalPages = this.itemsCount > MAX_RESULTS_WINDOW ?
      Math.ceil(MAX_RESULTS_WINDOW / this.offset) : Math.ceil(this.itemsCount / this.offset);
    if (this.totalPages < PAGES_DISPLAYED) {
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      if (this.currentPage <= DEFAULT_PAGE_POSITION) {
        this.startPage = 1;
        this.endPage = PAGES_DISPLAYED;
      } else if (this.currentPage + (PAGES_DISPLAYED - DEFAULT_PAGE_POSITION) >= this.totalPages) {
        this.startPage = this.totalPages - (PAGES_DISPLAYED - 1);
        this.endPage = this.totalPages;
      } else {
        this.startPage = this.currentPage - (DEFAULT_PAGE_POSITION - 1);
        this.endPage = this.currentPage + (PAGES_DISPLAYED - DEFAULT_PAGE_POSITION);
      }
    }
    // this.pages$ = Observable.range(this.startPage, (this.endPage - this.startPage) + 1).toArray();
  }

  /**
   * Select page number
   * @param {number} num
   * @memberOf PaginationComponent
   */
  selectPage(page: number): void {
    if (page > 0 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit({page});
    }
  }

  isPaginationItemDisabled(comparePage: any): boolean {
    return this.currentPage === comparePage;
  }
}
