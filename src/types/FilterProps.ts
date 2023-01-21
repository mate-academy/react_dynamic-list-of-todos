export interface FilterProps {
  searchQuery: string,
  value: string,
  handleOnChange: (value: string) => void,
  handleOnDelete: () => void,
  handleOnFilter: (value: string) => void,
}
