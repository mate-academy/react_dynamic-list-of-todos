import { FilterType } from './FilterType';

export interface Filter {
  type: FilterType;
  query: string;
}
