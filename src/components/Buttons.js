import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class Buttons extends Component {
  render() {
    const filters = [{ fil: 'Normal', id: 1 }, { fil: 'Todos', id: 2 }, { fil: 'Name', id: 3 }, { fil: 'Status', id: 4 }];
    const { changeFilter } = this.props;
    return (
      <div>
        <Button.Group widths="4">
          {filters.map(filter => (
              <Button onClick={() => changeFilter(filter.fil)} key={filter.id}>{`Sort By ${filter.fil}` === 'Sort By Normal' ? 'Reset' : `Sort By ${filter.fil}`}</Button>
          ))}
        </Button.Group>
      </div>
    );
  }
}

export default Buttons;
