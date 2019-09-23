import React from 'react';
import './TodosList.scss';
import Todo from '../Todo/Todo';
import { TodoListProps } from '../../constants/PropTypes';

function TodosList({ todos }) {
  return (
    <>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
}

TodosList.propTypes = TodoListProps;

export default TodosList;
