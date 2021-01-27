import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/todos';

export class CurrentUser extends React.Component {
  state = {
    name: '',
    email: '',
    phone: '',
    id: 0,
  }

  componentDidMount() {
    this.loadDate();
  }

  componentDidUpdate(prevState) {
    if (prevState.id !== this.props.userId && prevState.id !== 0) {
      this.loadDate();
    }
  }

  async loadDate() {
    await getUser(this.props.userId)
      .then(user => this.setState({ ...user.data }));
  }

  render() {
    const { name, email, phone, id } = this.state;
    const { onClear } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="submit"
          className="button"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    );
  }
}
