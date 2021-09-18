import React from 'react';

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  findTitle: string
};

export class Input extends React.PureComponent<Props, {}> {
  render() {
    return (
      <label htmlFor="findTitle">
        {' '}
        Show title
        {' '}
        <input
          type="text"
          id="findTitle"
          value={this.props.findTitle}
          placeholder="Write something"
          onChange={this.props.handleChange}
        />
      </label>
    );
  }
}
