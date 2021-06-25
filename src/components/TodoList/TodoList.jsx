import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import classNames from 'classnames';

import './TodoList.scss';

export const TodoList = React.memo(({ todos, setUserId }) => {
  const [state, updateState] = useState(
    {
      todosFromServer: todos,
      title: '',
      filterBy: '',
    },
  );

  const { todosFromServer, title, filterBy } = state;

  const todosForDisplay = todosFromServer.filter(todo => (
    typeof filterBy !== 'boolean'
      ? todo.title.includes(title)
      : todo.title.includes(title) && todo.completed === filterBy
  ));

  return (

    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__controlers">
        <TextField
          id="outlined-basic"
          label="Search for ..."
          variant="outlined"
          value={state.title}
          onChange={event => updateState({
            ...state, title: event.target.value,
          })}
        />
        <FormControl
          variant="outlined"
          style={{ width: 150 }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Filter By
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Filter By"
            value={state.filterBy}
            onChange={event => updateState({
              ...state, filterBy: event.target.value,
            })}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value>Completed</MenuItem>
            <MenuItem value={false}>Active</MenuItem>
          </Select>
        </FormControl>

        <button
          type="button"
          style={{ width: 150 }}
          onClick={() => updateState({
            ...state,
            todosFromServer: todos.sort((a, b) => Math.random() - 0.5),
          })}
        >
          Randomize
        </button>
      </div>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {
            todosForDisplay.map((todo) => {
              const { completed, userId, title: todoTitle, id } = todo;

              return (
                <li
                  key={id}
                  className={classNames(
                    'TodoList__item',
                    {
                      'TodoList__item--checked': completed,
                      'TodoList__item--unchecked': !completed,
                    },
                  )
                  }
                >
                  <label>
                    <input
                      type="checkbox"
                      name="completed"
                      checked={completed}
                      onChange={() => {
                        // eslint-disable-next-line
                        todo.completed = !completed;
                        updateState({
                          ...state, todosFromServer: todos,
                        });
                      }}
                    />
                    <p>{todoTitle}</p>
                  </label>
                  <button
                    type="button"
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    onClick={() => setUserId(userId)}
                  >
                    User&nbsp;#
                    {userId}
                  </button>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  setUserId: PropTypes.func.isRequired,
};
