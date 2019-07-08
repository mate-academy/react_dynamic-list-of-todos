import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import ColumnHead from './ColumnHead';
import changeCompleted from './changeCompleted';

const TodoList = ({ todos, sortStatus, updateAppState }) => (
  <div>
    <div className="todo-row">
      <ColumnHead
        todos={todos}
        sortStatus={sortStatus}
        updateAppState={updateAppState}
        columnName="Status"
      />

      <ColumnHead
        todos={todos}
        sortStatus={sortStatus}
        updateAppState={updateAppState}
        columnName="Todo"
      />

      <ColumnHead
        todos={todos}
        sortStatus={sortStatus}
        updateAppState={updateAppState}
        columnName="User"
      />
    </div>

    {
      todos.map((todo, currentIndex) => (
        <TodoItem
          {...todo}
          key={`keyTodo${todo.id}`}
          changeCompleted={() => changeCompleted(currentIndex, todo, todos, updateAppState)}
        />
      ))
    }
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  sortStatus: PropTypes.number.isRequired,
  updateAppState: PropTypes.func.isRequired,
};

export default TodoList;
