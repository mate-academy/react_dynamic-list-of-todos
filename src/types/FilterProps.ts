export interface FilterProps {
  searchQuery: string,
  filter: string,
  handleOnChange: (value: string) => void,
  handleOnDelete: () => void,
  handleOnFilter: (value: string) => void,
}
