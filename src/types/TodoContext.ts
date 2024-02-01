import React, { SetStateAction } from 'react';
import { Todo } from './Todo';

export interface TodoContext {
  show: boolean
  setShow: React.Dispatch<SetStateAction<boolean>>
  selectedTodo: Todo
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo>>
  filterField: string
  setFilterField: React.Dispatch<React.SetStateAction<string>>
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}
