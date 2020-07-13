import React, { useState } from 'react';
import { SortButtons } from './SortButtons';
import { TodoList } from './TodoList';
import { TodoModified } from '../interfaces/todoModified';

interface Props {
  todosList: TodoModified[];
}

export const TodosBlock: React.FC<Props> = (props) => {
  const { todosList } = props;

  const [todos, setTodos] = useState<TodoModified[]>(todosList);

  const sortBy = (value: string) => {
    const updatedList = todosList.sort((a, b) => {
      return (a[value] > b[value]) ? 1 : -1;
    });

    setTodos([...updatedList]);
  };

  return (
    <>
      <SortButtons sortBy={sortBy} />
      <TodoList todos={todos} />
    </>
  );
};
