import React from 'react';
import classNames from 'classnames';
import { getTasks } from '../../api';
import './TodoList.scss';

enum CompletenessTypes {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

interface State {
  tasks: [] | Todo[];
  filterQuery: string;
  completenessQuery: CompletenessTypes;
}

interface Props {
  selectedUserId: number;
  chooseAUser: (event: React.MouseEvent) => void;
}

export class TodoList extends React.Component<Props, State> {
  state = {
    tasks: [],
    filterQuery: '',
    completenessQuery: 'all' as CompletenessTypes.all,
  };

  async componentDidMount() {
    const tasks = await getTasks();

    this.setState({ tasks });
  }

  filterQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filterQuery: event.target.value,
    });
  };

  completenessQueryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      completenessQuery: event.target.value as CompletenessTypes.active
      | CompletenessTypes.completed
      | CompletenessTypes.all,
    });
  };

  getFilteredTasks = () => {
    const {
      tasks,
      filterQuery,
      completenessQuery,
    } = this.state;

    let filteredTasks = tasks.filter((task: Todo) => (
      task.title
      && task.title.toLowerCase()
        .includes(filterQuery.toLowerCase())
    ));

    filteredTasks = filteredTasks.filter((task: Todo) => {
      switch (completenessQuery) {
        case 'active' as CompletenessTypes:
          return task.completed === false;
        case 'completed' as CompletenessTypes:
          return task.completed === true;
        case 'all' as CompletenessTypes.all:
        default:
          return task;
      }
    });

    return filteredTasks;
  };

  render() {
    const { filterQuery } = this.state;
    const { selectedUserId, chooseAUser } = this.props;
    const filteredTasks = this.getFilteredTasks();

    return (
      filteredTasks && (
        <div className="TodoList">
          <h2>Todos:</h2>
          <div className="TodoList__list-container">
            <input
              type="text"
              placeholder="Write key words here"
              value={filterQuery}
              onChange={this.filterQueryChange}
              className="TodoList__filter"
            />

            <select
              onChange={this.completenessQueryChange}
            >
              <option
                value="all"
              >
                Filter by completeness
              </option>
              <option value="all">
                all
              </option>
              <option value="active">
                active
              </option>
              <option value="completed">
                completed
              </option>
            </select>

            <ul className="TodoList__list">
              {filteredTasks.map((task: Todo) => (
                <li
                  className={classNames('TodoList__item', {
                    'TodoList__item--unchecked': !task.completed,
                    'TodoList__item--checked': task.completed,
                  })}
                  key={task.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      readOnly
                    />
                    <p>
                      {task.title}
                    </p>
                  </label>

                  <button
                    className={classNames('TodoList__user-button button', {
                      'TodoList__user-button--selected': task.userId === selectedUserId,
                    })}
                    type="button"
                    value={task.userId}
                    onClick={chooseAUser}
                  >
                    User&nbsp;#
                    {task.userId}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    );
  }
}
