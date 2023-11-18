import { FilterOption } from '../enums/FilterOption';

export type Filter = {
  filterText: string;
  filterOption: FilterOption;
  save: (text: string, option: FilterOption) => void;
};
