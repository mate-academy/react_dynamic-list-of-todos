import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { GetEndpoint } from '../../api';

type Propps = {
  setSelectUser: (userId: number) => void,
  selectUser: number,
};

export const TodoList: React.FC<Propps> = ({ setSelectUser, selectUser }) => {
  const [todos, setTodos] = useState([]);
  const [prepareTodos, setPrepareTodos] = useState(todos);
  const [todosForRand, setTodosForRand] = useState([]);
  const [filterByString, setFilterByString] = useState('');
  const [filterByComplete, setFilterByComplete] = useState('all');
  const [isRandom, setIsRandom] = useState(false);

  const getAllTodos = async () => {
    const allTodosFromServer = await GetEndpoint('todos');
    const filteringTodos
    = allTodosFromServer.filter((todo: Todo, index: number, toDos: Todo[]) => {
      return (
        index < toDos.length - 1
          ? todo.userId !== toDos[index + 1].userId
            && todo.title !== toDos[index + 1].title
          : true
      );
    });

    setTodos(filteringTodos);
    setPrepareTodos(filteringTodos);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const filterHandler = () => {
    let completeStatusForFiltered: boolean | string;

    switch (filterByComplete) {
      case 'notComplete': completeStatusForFiltered = true;
        break;
      case 'complete': completeStatusForFiltered = false;
        break;
      default: completeStatusForFiltered = 'all';
    }

    setPrepareTodos(
      todos.filter((todo: Todo) => {
        return todo.title.includes(filterByString)
        && todo.completed !== completeStatusForFiltered;
      }),
    );
  };

  const shuffleArray = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = prepareTodos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [prepareTodos[i], prepareTodos[j]] = [prepareTodos[j], prepareTodos[i]];
    }
  };

  useEffect(() => {
    setTodosForRand([...prepareTodos]);
    filterHandler();
  }, [filterByString, filterByComplete]);

  useEffect(() => {
    setTodosForRand([...prepareTodos]);

    if (isRandom) {
      shuffleArray();
    } else {
      setPrepareTodos([...todosForRand]);
    }
  }, [isRandom]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="actions">
        <div className="actions__filter">
          <h3>Filter</h3>
          <input
            data-cy="filterByTitle"
            type="text"
            value={filterByString}
            onChange={(event) => setFilterByString(event.target.value)}
          />
        </div>
        <div className="actions__select">
          <h3>Select</h3>
          <select
            name="select"
            defaultValue="all"
            onChange={(event) => setFilterByComplete(event.target.value)}
          >
            <option value="all">All</option>
            <option value="notComplete"> Not complete</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div className="actions__select">
          <h3>Random list</h3>
          <button
            type="button"
            onClick={() => setIsRandom(prev => !prev)}
          >
            Random/Default
          </button>
        </div>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {prepareTodos.map((todo: Todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                data-cy="userButton"
                onClick={() => setSelectUser(todo.userId)}
                className={classNames('TodoList__user-button', 'button', {
                  'TodoList__user-button--selected': todo.userId === selectUser,
                })}
                type="button"
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}

          <li className="TodoList__item TodoList__item--checked">
            <label>
              <input type="checkbox" checked readOnly />
              <p>distinctio vitae autem nihil ut molestias quo</p>
            </label>

            <button
              className="TodoList__user-button button"
              type="button"
            >
              User&nbsp;#2
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
