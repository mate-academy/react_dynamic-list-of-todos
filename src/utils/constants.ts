import { Status } from '../types/Todo';

export const STATUS_FILTER_OPTIONS = [
  {
    value: Status.all,
    label: 'All',
  },
  {
    value: Status.active,
    label: 'Active',
  },
  {
    value: Status.completed,
    label: 'Completed',
  },
];
