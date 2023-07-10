import { Component } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  selectTodo: (todoIdFromlist: number | string) => void
  selectedTodoId:number | string
};

type State = {
  user: User ;
  selectedTodo: Todo;
  loader:boolean
};

export class TodoModal extends Component<Props, State> {
  state = {
    user: {} as User,
    selectedTodo: {} as Todo,
    loader: true,
  };

  async componentDidMount() {
    const { todos, selectedTodoId } = this.props;
    const selectedTod = todos.find(todo => todo.id === selectedTodoId);

    if (selectedTod) {
      const user = await getUser(selectedTod.userId);

      this.setState({ user, selectedTodo: selectedTod, loader: false });
    }
  }

  render() {
    const { user, selectedTodo, loader } = this.state;
    const { selectTodo } = this.props;
    const { id, title, completed } = selectedTodo;
    const { email, name } = user;

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        <div className="modal-card">
          {(!user || loader) ? <Loader /> : '' }
          {!loader && (
            <>
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => {
                    selectTodo(0);
                  }}
                />
              </header>
              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}
                  {' by '}
                  <a href={`mailto:${email}`}>
                    {name}
                  </a>
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    );
  }
}
