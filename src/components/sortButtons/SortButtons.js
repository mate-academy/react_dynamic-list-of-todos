import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';

class SortButtons extends PureComponent {
  render() {
    const { titleSort, userNameSort, completedSort } = this.props;
    return (
      <section className="sortButtonsContainer">
        <Button secondary onClick={titleSort}>Sort by title</Button>
        <Button secondary onClick={userNameSort}>Sort by user name</Button>
        <Button secondary onClick={completedSort}>Sort by completed</Button>
      </section>
    );
  }
}

SortButtons.propTypes = {
  titleSort: PropTypes.func.isRequired,
  userNameSort: PropTypes.func.isRequired,
  completedSort: PropTypes.func.isRequired,
};

export default SortButtons;
