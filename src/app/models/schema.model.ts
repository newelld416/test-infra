export enum CellType {
  Data,
  Option,
  Link,
  Status
}

export interface Schema {
  title: string;
  property: string;
  filter: boolean;
  type?: CellType;
  key?: string;
}
