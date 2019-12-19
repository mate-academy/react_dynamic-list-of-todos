import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ fullTodos }) => {
  const [todos, setTodos] = useState([...fullTodos]);
  const [sortingTitle, setSortingTitle] = useState('');

  const getSortedTodos = (listOfTodos, title) => {
    if (title === 'user') {
      return [...listOfTodos]
        .sort((firstTodo, secondTodo) => (
          firstTodo.user.name.localeCompare(secondTodo.user.name)
        ));
    }

    return [...listOfTodos].sort((firstTodo, secondTodo) => {
      switch (typeof firstTodo[title]) {
        case 'string':
          return firstTodo[title].localeCompare(secondTodo[title]);
        case 'boolean':
          return Number(secondTodo[title]) - Number(firstTodo[title]);
        default:
          return firstTodo[title] - secondTodo[title];
      }
    });
  };

  const setSortBy = (item) => {
    if (item === sortingTitle) {
      setTodos([...todos.reverse()]);
    } else {
      setTodos([...getSortedTodos(todos, item)]);
      setSortingTitle(item);
    }
  };

  const headings = ['id', 'title', 'user', 'completed'];

  return (
    <table className="table">
      <thead>
        <tr>
          {headings.map(heading => (
            <th
              className="table__heading"
              onClick={() => setSortBy(heading)}
            >
              {heading.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </tbody>
    </table>
  );
};

TodoList.propTypes
  = { fullTodos: PropTypes.oneOfType([PropTypes.array]).isRequired };

export default TodoList;
