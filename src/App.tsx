import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { getPrepareTodos } from './helpers/api';
import './App.css';
import TodoList from './TodoList';
import ButtonsSort from './ButtonsSort';

const App: React.FC = () => {
  // const [text, setText] = useState('Load');
  const [isToggle, setIsToggle] = useState(false);
  const [todos, setTodos] = useState<PrepareTodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string>('id');

  const visibleTodos = [...todos];

  const loadTodos = () => {
    // !isToggle ? setText('Loading...') : setText('Load');

    setIsToggle(!isToggle);

    setTimeout(() => {
      getPrepareTodos()
        .then(todosFromServe => {
          setTodos(todosFromServe);
          setIsLoading(true);
        });
    }, 1000);
  };

  switch (sortField) {
    case 'completed':
      visibleTodos.sort(
        (a, b) => +a[sortField] - +b[sortField],
      );
      break;

    case 'title':
      visibleTodos.sort(
        (a, b) => a[sortField].localeCompare(b[sortField]),
      );
      break;

    case 'name':
      visibleTodos.sort(
        (a, b) => a.userId[sortField].localeCompare(b.userId[sortField]),
      );
      break;

    default:
      visibleTodos.sort(
        (a, b) => a.id - b.id,
      );
  }

  return (
    <div className="container">
      <h1 className="title is-1">Dynamic list of TODOs</h1>
      {!isToggle
        ? (
          <button
            type="button"
            className="button is-primary is-medium"
            onClick={loadTodos}
          >
            Load
          </button>
        )
        : (
          <div className={classNames({ 'lds-roller': !isLoading }, { 'has-background-success': isLoading })}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        )}

      {isLoading && (
        <div className="bd-snippet-preview ">
          <table className="table is-striped is-hoverable">
            <thead className="has-background-grey-lighter">
              <ButtonsSort setSortField={setSortField} />
            </thead>
            <tfoot>
              <ButtonsSort setSortField={setSortField} />
            </tfoot>
            <tbody>
              <TodoList todos={visibleTodos} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
