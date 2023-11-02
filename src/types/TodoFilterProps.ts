export interface TodoFilterProps {
  setFilterStatus: (status: string) => void;
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}
