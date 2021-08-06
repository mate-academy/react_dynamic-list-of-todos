import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import {
  Card,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';

export class TodoList extends Component {
  state = {
    searchTitle: '',
    selectBy: 'all',
  }

  handleSelect = (event) => {
    this.setState({
      selectBy: event,
    });
  };

  handleSearchTitle = (event) => {
    this.setState({ searchTitle: event.target.value });
  };

  handleSelectUser = (event) => {
    this.props.onSelect(event.target.value);
  };

  segregateByStatus =(status, filteredTodos) => {
    let selectedTodos = [];

    if (status !== 'all') {
      selectedTodos = filteredTodos.filter(todo => (status === 'active'
        ? !todo.completed
        : todo.completed));
    } else {
      selectedTodos = filteredTodos;
    }

    return selectedTodos;
  }

  render() {
    const { todos } = this.props;
    const { searchTitle, selectBy } = this.state;

    const filteredTodos = todos.filter((todo) => {
      if (todo.title === null) {
        return false;
      }

      return todo.title.toLowerCase().includes(searchTitle.toLowerCase());
    });

    const segregatedTodos = this.segregateByStatus(selectBy, filteredTodos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <Card className="TodoList__list-container">
          <Card.Body>
            <Card.Title>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  Filter:
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Search by title"
                  value={this.state.searchTitle}
                  onChange={this.handleSearchTitle}
                />
                <DropdownButton
                  className="mb-2"
                  size="lg"
                  align={{ lg: 'end' }}
                  id="dropdown-basic-button"
                  title={this.state.selectBy}
                  onSelect={this.handleSelect}
                >
                  <Dropdown.Item as="button" href="all" value="all">
                    all
                  </Dropdown.Item>
                  <Dropdown.Item as="button" href="active" value="active">
                    active
                  </Dropdown.Item>
                  <Dropdown.Item as="button" href="completed" value="completed">
                    completed
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Card.Title>
            <Card.Text>
              <ul className="TodoList__list">
                {segregatedTodos.map(todo => (
                  <li
                    className={`
                      TodoList__item
                      TodoList__item${todo.completed
                      ? '--checked'
                      : '--unchecked'}`
                      }
                    key={todo.id}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name={todo.id}
                        checked={todo.completed}
                        onChange={this.handleChecked}
                      />
                      <p>{todo.title}</p>
                    </label>
                    <button
                      className="
                        TodoList__user-button
                        TodoList__user-button--selected
                        button"
                      type="button"
                      value={todo.userId}
                      onClick={this.handleSelectUser}
                    >
                      User&nbsp;
                      {todo.userId}
                    </button>
                  </li>
                ))}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
  onSelect: PropTypes.func.isRequired,
};
