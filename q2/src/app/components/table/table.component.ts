import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
})
export class Table {
  _value: any[] = [];

  _columns: any[] | undefined = [];

  /**
   * An array of objects to display.
   * @group Props
   */
  @Input() get value(): any[] {
    return this._value;
  }
  set value(value: any[]) {
    this._value = value;
  }

  /**
   * An array of objects to represent dynamic columns.
   * @group Props
   */
  @Input() get columns(): any[] | undefined {
    return this._columns;
  }
  set columns(cols: any[] | undefined) {
    this._columns = cols;
  }
}
