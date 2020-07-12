interface TodoModifiedType {
  [key: string]: number | string | boolean;
}

export interface TodoModified extends TodoModifiedType {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
  readonly userName: string;
}
