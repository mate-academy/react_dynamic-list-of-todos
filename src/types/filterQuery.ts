import { FilterStatus } from './filterStatus';

export interface FilterQuery {
  status: FilterStatus;
  search: string;
}
