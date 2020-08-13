import React from 'react';
import TodoItem from './TodoItem';
import { Todo, User } from '../interfaces';

interface Props {
  todos: Todo[];
  users: User[];
}

const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          user={{ ...users.filter((user: User) => user.id === todo.userId)[0] }}
        />
      ))}
    </ul>
  );
};

export default TodoList;
