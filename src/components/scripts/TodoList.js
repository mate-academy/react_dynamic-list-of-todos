import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';
import '../styles/todoList.css';
import Filter from './Filter';

const TodoList = ({ todos, sortBy }) => (
  <>
    <Filter sortBy={sortBy} />
    <div className="container-table">
      <table className="table">
        <thead className="table__thead">
          <tr>
            <th
              className="table__item"
            >
              Title
            </th>
            <th
              className="table__item"
            >
              User
            </th>
            <th
              className="table__item"
            >
              Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  </>
);

TodoList.propTypes = {
  todos: propTypes.shape().isRequired,
  sortBy: propTypes.func.isRequired,
};

export default TodoList;
