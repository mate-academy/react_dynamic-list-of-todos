import React from 'react';
import './CurrentUser.scss';

const URL = 'https://mate-api.herokuapp.com';

export class CurrentUser extends React.Component {

  state = {
    user: '',
  };

  componentDidMount() {
    this.allData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.allData();
    }
  }

  getTodos = async() => {
    const response = await fetch(`${URL}/users/${this.props.userId}`);
    const result = await response.json();

    return result.data;
  };

  allData() {
    this.getTodos().then(user => this.setState({ user }));
  }

  render() {
    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {this.state.user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{this.state.user.name}</h3>
        <p className="CurrentUser__email">{this.state.user.email}</p>
        <p className="CurrentUser__phone">{this.state.user.phone}</p>
      </div>
    )
  }
};
