import React from "react";

export interface Props {
  query: string,
  filterBy: ShowType,
  onSelectChange: React.Dispatch<React.SetStateAction<ShowType>>
  onInputChange: React.Dispatch<React.SetStateAction<string>>
}

export enum ShowType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
