// import isNil from 'lodash/isNil';

import React from 'react';
import { Button, Form, Item } from 'semantic-ui-react';
import invoke from 'lodash/invoke';
const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
};

// import { BodyWidth } from '../Body/Body';
export interface FilterProps {
  /** Fields configuration */
  fields?: any[];
  /** handle filter change */
  filterchange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
}

class Filter extends React.Component<FilterProps, any> {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      data: {},
    };
  }

  public render() {
    const { fields } = this.props;

    return (
      <Form style={{ margin: '5px' }} size='tiny'>
        {fields.map((item) =>
          item.searchFlag ? (
            <Form.Field key={`filter-${item.model}`}>
              <label>{item.name}</label>
              <input
                placeholder={item.name}
                id={item.model}
                onChange={this.handleValueChange}
              />
            </Form.Field>
          ) : (
            ''
          ),
        )}

        <Form.Field style={buttonStyle}>
          <Button
            type='button'
            fluid
            size='tiny'
            primary
            onClick={this.handleFilterChange}
          >
            Search
          </Button>
        </Form.Field>
      </Form>
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
