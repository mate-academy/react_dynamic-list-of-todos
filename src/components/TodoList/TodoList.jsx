import React from 'react';
import PropTypes from 'prop-types';
import { List } from '../List';
import { Form } from '../Form';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    inputTitle: '',
    defaultSelect: 'Show All',
  }

  fitterByTitle = (todo) => {
    const { inputTitle } = this.state;

    return todo.title.toLowerCase()
      .includes(inputTitle.toLowerCase());
  }

  handleInput = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  filterByStatus = (todo) => {
    const { defaultSelect } = this.state;

    switch (defaultSelect) {
      case 'Show Completed':
        return todo.completed;
      case 'Show Active':
        return !todo.completed;
      default:
        return true;
    }
  }

  render() {
    const {
      todos,
      checkedHandler,
      selecUser,
      randomizTodo,
    } = this.props;

    const {
      inputTitle,
      defaultSelect,
    } = this.state;

    const filterTodos = todos
      .filter(this.fitterByTitle)
      .filter(this.filterByStatus);

    return (
      <div className="TodoList">
        <h2>{`Todos: ${filterTodos.length}`}</h2>
        <div className="TodoList__box">
          <button
            className="
            TodoList__user-button
            TodoList__user-button--selected
            button
            "
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => {
              randomizTodo(todos);
            }}
          >
            Random
          </button>
          <Form
            handleInput={this.handleInput}
            inputTitle={inputTitle}
            defaultSelect={defaultSelect}
          />
        </div>
        <List
          filterTodos={filterTodos}
          checkedHandler={checkedHandler}
          selecUser={selecUser}
        />
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  checkedHandler: PropTypes.func.isRequired,
  selecUser: PropTypes.func.isRequired,
  randomizTodo: PropTypes.func.isRequired,
};
