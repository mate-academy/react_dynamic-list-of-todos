import React, { useState } from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Form } from '../Form';
import { Todo } from '../Todo';

const TodoList = ({ allTodos, onUserSelect }) => {
  const [todos, setTodos] = useState(allTodos);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const categoryFilters = {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  };

  const onComplete = (event) => {
    const { value } = event.target;

    setCategory(value);

    filterTodos(query, value);
  };

  const onSearch = (event) => {
    const { value } = event.target;

    setQuery(value);

    filterTodos(value, category);
  };

  const filterTodos = (searchQuery, selectedCategory) => {
    setTodos([...allTodos]
      .filter(todo => todo.title && todo.title.toLowerCase().includes(
        searchQuery.toLowerCase(),
      ) && categoryFilters[selectedCategory](todo)));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <Form onSearch={onSearch} onComplete={onComplete} />

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <Todo key={todo.id} {...todo} onUserClick={onUserSelect} />
          ))}
        </ul>
      </div>
    </div>
  );
};

TodoList.defaultProps = {
  allTodos: [
    Todo.defaultProps,
  ],
};

TodoList.propTypes = {
  allTodos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.number.isRequired,
    }),
  ),
  onUserSelect: PropTypes.func.isRequired,
};

export { TodoList };
