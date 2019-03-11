import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  @Input() defaultOpenState = false;
  state: boolean;

  ngOnInit() {
    this.state = this.defaultOpenState;
  }

  /**
   * toggle collapse state
   * @memberOf Collapse
   */
  changeState() {
    this.state = !this.state;
  }
}
