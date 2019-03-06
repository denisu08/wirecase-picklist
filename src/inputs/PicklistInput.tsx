import PropTypes from 'prop-types';
import React from 'react';

class PicklistInput extends React.Component {
  public static readonly defaultProps = {
    value: ''
  };

  public static readonly propTypes = {
    /** Currently selected value. */
    value: PropTypes.string.isRequired
  };

  constructor(props: any) {
    super(props);
  }

  public render() {
    return 'test';
  }
}

export default PicklistInput;
