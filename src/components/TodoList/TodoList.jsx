import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    checked: false,
    values: [],
    selected: '',
  }

  handleChange = (event) => {
    this.setState({
      selected: event.target.value,
    });
  }

  render() {
    const { todos, selectUser } = this.props;
    const { query, checked, values, selected } = this.state;
    const needTodos = todos
      .filter(todo => todo.title !== '' && todo.userId !== null)
      .filter((todo) => {
        if (selected === 'active') {
          return todo.completed === false;
        }

        if (selected === 'completed') {
          return todo.completed === true;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          id="search-query"
          placeholder="Type search word"
          value={this.state.query}
          onChange={(event) => {
            this.setState({
              query: event.target.value,
            });
          }}
        />

        <select
          value={this.state.selected}
          onChange={this.handleChange}
        >
          <option value="">chose your variant</option>
          <option
            value="all"
          >
            all
          </option>
          <option
            value="active"
          >
            active
          </option>
          <option
            value="completed"
          >
            completed
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {needTodos
              .filter((item) => {
                const insensitiveQuery = query.toLowerCase();
                const insensitiveTitle = item.title.toLowerCase();

                return insensitiveTitle.includes(insensitiveQuery);
              })
              .map(todo => (
                <li
                  key={todo.id}
                  className={`TodoList__item
                  ${(checked && values.includes(todo.id))
                  || (todo.completed === true)
                  ? 'TodoList__item--checked' : 'TodoList__item--unchecked'}`}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={(checked && values.includes(todo.id))
                      || (todo.completed === true)}
                      onClick={() => {
                        this.setState(state => ({
                          checked: !state.checked,
                          values: [...state.values, todo.id],
                        }));
                      }}
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                    type="button"
                    onClick={() => {
                      selectUser(todo.userId);
                    }}
                  >
                    {`User ${todo.userId}`}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    title: PropTypes.string,
  }).isRequired).isRequired,
  selectUser: PropTypes.func.isRequired,
};
