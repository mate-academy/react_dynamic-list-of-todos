import React, { useState } from 'react';
import './TodoList.css';
import { Todo } from '../Todo/Todo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([...todos]);

  const sortByTitle = (): void => {
    setSortedTodos(prev => (
      [...prev].sort((first, second) => first.title.localeCompare(second.title))
    ));
  };

  const sortByCompleted = (): void => {
    setSortedTodos(prev => (
      [...prev].sort((first, second) => Number(second.completed) - Number(first.completed))
    ));
  };

  const sortByUserName = (): void => {
    setSortedTodos(prev => (
      [...prev].sort((first, second) => first.user.name.localeCompare(second.user.name))
    ));
  };

  return (
    <>
      <button type="button" onClick={sortByTitle}>Sort by Todo title</button>
      <button type="button" onClick={sortByCompleted}>Sort by Completed</button>
      <button type="button" onClick={sortByUserName}>Sort by User</button>
      <ul>
        {
          sortedTodos.map(todo => (
            <li className="todo" key={todo.id}>
              <Todo todo={todo} />
            </li>
          ))
        }
      </ul>
    </>
  );
};
