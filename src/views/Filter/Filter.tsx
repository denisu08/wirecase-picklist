// import isNil from 'lodash/isNil';

import React from 'react';
import { Button, Form, Input, Segment } from 'semantic-ui-react';
import invoke from 'lodash/invoke';
const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '5px',
};

// import { BodyWidth } from '../Body/Body';
export interface FilterProps {
  /** Fields configuration */
  fields?: any[];
  /** handle filter change */
  filterchange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
}

class Filter extends React.Component<FilterProps, any> {
  public state = { data: {} };

  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  public render() {
    const { fields } = this.props;

    return (
      <Segment style={{ margin: '5px' }} size='tiny'>
        {fields.map((item) =>
          item.searchFlag ? (
            <div key={`filter-${item.model}`}>
              <label>{item.name}</label>
              <Input
                fluid
                placeholder={item.name}
                id={item.model}
                onChange={this.handleValueChange}
              />
            </div>
          ) : (
            ''
          ),
        )}

        <div style={buttonStyle}>
          <Button
            type='button'
            fluid
            size='tiny'
            primary
            onClick={this.handleFilterChange}
          >
            Search
          </Button>
        </div>
      </Segment>
    );
  }
  protected handleValueChange(e) {
    const target = e.currentTarget;
    this.setState({
      data: Object.assign(this.state.data, { [target.id]: target.value }),
    });
  }

  protected handleFilterChange(e) {
    invoke(this.props, 'filterchange', e, {
      ...this.props,
      value: this.state.data,
    });
  }
}

export default Filter;
