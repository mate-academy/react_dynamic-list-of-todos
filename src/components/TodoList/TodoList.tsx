import React, { useState } from 'react';
import { TodoWithUserInterface } from '../../interfaces/TodoInterface';
import { TodoItem } from '../TodoItem.tsx/TodoItem';
import { SortField } from '../SortField';

type TodoListProps = {
  todos: TodoWithUserInterface[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [activeSortName, setActiveSortName] = useState<string>('userName');
  const todosSorted = [...todos].sort((a: TodoWithUserInterface, b: TodoWithUserInterface) => {
    if (activeSortName === 'completed') {
      return Number(a.completed) - Number(b.completed);
    }

    if (activeSortName === 'title') {
      return a.title.localeCompare(b.title);
    }

    return a.user.name.localeCompare(b.user.name);
  });

  const sortTodos = (sortName: string) => {
    setActiveSortName(sortName);
  };

  return (
    <ul>
      <li className="row">
        <SortField
          name="completed"
          position="left"
          handleChange={sortTodos}
          isActive={activeSortName === 'completed'}
        />
        <SortField
          name="title"
          position="center"
          handleChange={sortTodos}
          isActive={activeSortName === 'title'}
        />
        <SortField
          name="userName"
          position="right"
          handleChange={sortTodos}
          isActive={activeSortName === 'userName'}
        />
      </li>
      {
        todosSorted.map((todo: TodoWithUserInterface) => (
          <TodoItem
            id={todo.id}
            key={todo.id}
            completed={todo.completed}
            userName={todo.user.name}
            title={todo.title}
          />
        ))
      }
    </ul>
  );
};
