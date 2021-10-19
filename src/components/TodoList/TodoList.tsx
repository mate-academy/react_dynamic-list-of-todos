import React from 'react';

import './TodoList.scss';
import { TodoInfo } from '../TodoInfo';
import { ListFilter } from './ListFilter';

type Props = {
  todos: Todo[];
  selectedUserId: number | null;
  onUserSelect: (userId: number) => void;
  onTodosShuffle: () => void;
};

type State = {
  filterQuery: string;
  filterBy: FilterOption;
};

export class TodoList extends React.Component<Props> {
  state: State = {
    filterQuery: '',
    filterBy: 'all',
  };

  handleQuery = (filterQuery: string) => {
    this.setState({ filterQuery });
  };

  handleFilterChange = (filterBy: FilterOption) => {
    this.setState({ filterBy });
  };

  render() {
    const { filterQuery, filterBy } = this.state;
    const {
      todos,
      selectedUserId,
      onUserSelect,
      onTodosShuffle,
    } = this.props;

    const todosByOption = todos.filter(todo => {
      switch (filterBy) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });

    const todosByQuery = todosByOption.filter(({ title }) => {
      return title.toLowerCase().includes(filterQuery.toLowerCase());
    });

    return (
      <div className="TodoList">
        <ListFilter
          query={filterQuery}
          filterOption={filterBy}
          onQueryChange={this.handleQuery}
          onFilterChange={this.handleFilterChange}
          onShuffle={onTodosShuffle}
        />
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosByQuery.map(({
              id, title, userId, completed,
            }) => (
              <TodoInfo
                key={id}
                id={id}
                userId={userId}
                completed={completed}
                isSelected={userId === selectedUserId}
                title={title}
                onUserSelect={onUserSelect}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
