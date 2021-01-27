import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';

import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    userToPrint: null,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const newTodos = await getUser(this.props.userId).then(user => user.data);

    this.setState({
      userToPrint: newTodos,
    });
  }

  render() {
    const { userToPrint } = this.state;
    const { clear } = this.props;

    return (
      <>
        {this.state.userToPrint ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {userToPrint.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{userToPrint.name}</h3>
            <p className="CurrentUser__email">{userToPrint.email}</p>
            <p className="CurrentUser__phone">{userToPrint.phone}</p>
            <button
              type="button"
              className="CurrentUser__button"
              onClick={clear}
            >
              Clear
            </button>
          </div>
        ) : '...loading'}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
};
