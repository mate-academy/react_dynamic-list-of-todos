import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Form = ({ todos, addFilterTodos }) => {
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('All');

  const filteredTodos = () => {
    const filteredTodosSearch = todos
      .filter(todo => (todo.title ? todo.title.includes(input) : false));

    switch (select) {
      case 'Active':
        return addFilterTodos(filteredTodosSearch
          .filter(todo => !todo.completed));

      case 'Completed':
        return addFilterTodos(filteredTodosSearch
          .filter(todo => todo.completed));

      default:
      case 'All':
        return addFilterTodos(filteredTodosSearch);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'input') {
      setInput(value);
    }

    if (name === 'select') {
      setSelect(value);
    }
  };

  useEffect(() => {
    filteredTodos();
  }, [input, select]);

  return (
    <>
      <input
        name="input"
        type="text"
        value={input}
        onChange={event => handleChange(event)}
      />

      <select
        name="select"
        value={select}
        onChange={event => handleChange(event)}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </>
  );
};

Form.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  addFilterTodos: PropTypes.func.isRequired,
};
