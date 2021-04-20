import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

export class CurrentUser extends React.PureComponent {
  state = {
    selectedUser: {},
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  loadData() {
    getUser(this.props.userId)
      .then(user => this.setState({
        selectedUser: user,
      }));
  }

  render() {
    const { selectedUser } = this.state;
    const { deleteUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {selectedUser.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{selectedUser.name}</h3>
        <p className="CurrentUser__email">{selectedUser.email}</p>
        <p className="CurrentUser__phone">{selectedUser.phone}</p>
        <button
          className="button"
          type="button"
          onClick={() => {
            deleteUser();
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
