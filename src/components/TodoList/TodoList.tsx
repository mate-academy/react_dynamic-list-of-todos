import React, { useState, FC } from 'react';
import { TodoInterface } from '../../interfaces/TodoInterface';
import { TodoItem } from '../TodoItem.tsx/TodoItem';
import { SortField } from '../SortField';

type TodoListProps = {
  todos: TodoInterface[];
};

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  const [activeSortName, setActiveSortName] = useState<string>('userName');
  const todosSorted = [...todos].sort((a, b) => {
    if (activeSortName === 'completed') {
      return Number(a.completed) - Number(b.completed);
    }

    if (activeSortName === 'userName' && (a.user && b.user)) {
      return a.user.name.localeCompare(b.user.name);
    }

    return a.title.localeCompare(b.title);
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
        todosSorted.map((todo: TodoInterface) => (
          todo.user && (
            <TodoItem
              id={todo.id}
              key={todo.id}
              completed={todo.completed}
              userName={todo.user.name}
              title={todo.title}
            />
          )
        ))
      }
    </ul>
  );
};
