import { useState } from 'react';
import { FilterOption } from '../enums/FilterOption';
import { Filter } from '../types/Filter';

export const useFilter = (): Filter => {
  const [filterText, setFilterText] = useState<string>('');
  const [filterOption, setFilterOption]
  = useState<FilterOption>(FilterOption.ALL);

  const save = (text: string, option: FilterOption) => {
    setFilterText(text);
    setFilterOption(option);
  };

  return {
    filterText,
    filterOption,
    save,
  };
};
