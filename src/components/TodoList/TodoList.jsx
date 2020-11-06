import React from 'react';
import './TodoList.scss';
import { Todo, shapeTodo } from '../Todo';
import { TodoForms, shapeTodoForms } from '../TodoForms';

export const TodoList = ({
  search,
  query,
  handleSelect,
  todos,
  handleUser,
  selectedUserId,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <TodoForms
      search={search}
      query={query}
      handleSelect={handleSelect}
    />
    <Todo
      todos={todos}
      handleUser={handleUser}
      selectedUserId={selectedUserId}
    />
  </div>
);

TodoList.propTypes = {
  ...shapeTodoForms,
  ...shapeTodo,
}.isRequired;
