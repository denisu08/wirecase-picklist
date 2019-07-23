// import isNil from 'lodash/isNil';

import React from 'react';
import {
  Button,
  Input,
  Segment,
  Dropdown,
  Radio,
  Checkbox,
} from 'semantic-ui-react';
import invoke from 'lodash/invoke';
import * as _ from 'lodash';

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
  filtered?: any;
  closable?: boolean;
  closePopup: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
}

class Filter extends React.Component<FilterProps, any> {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.state = { data: props.filtered || {} };
  }

  public render() {
    const { fields, closable } = this.props;
    if (!fields || fields.length === 0) {
      return null;
    }

    const searchFields = [];
    fields.forEach((item) => {
      if (item.searchFlag) {
        searchFields.push(
          <div key={`filter-${item.model}`}>
            <label style={{ fontSize: '10px', marginRight: '20px' }}>
              {item.name}
            </label>
            {this.getComponent(item)}
          </div>,
        );
      }
    });

    return (
      <Segment style={{ margin: '5px' }} size='tiny'>
        {searchFields && searchFields.length > 0 ? searchFields : null}
        <div style={buttonStyle}>
          {searchFields && searchFields.length > 0 ? (
            <Button
              type='button'
              fluid
              size='tiny'
              primary
              onClick={this.handleFilterChange}
            >
              Search
            </Button>
          ) : null}
          {closable ? (
            <Button
              type='button'
              color='red'
              fluid
              size='tiny'
              onClick={this.closePopup}
            >
              Close
            </Button>
          ) : null}
        </div>
      </Segment>
    );
  }

  /**
   * Checkbox,     => checkbox
   * RadioButton,  => radio
   * Dropdown,     => dropdown
   * Dropdown,     => multidropdown
   * Switch,       => switch
   * InputText,    => input
   */
  protected getComponent(item) {
    const { data = {} } = this.state;

    switch (item.type) {
      case 'checkbox':
        return item.options.map((f) => (
          <Checkbox
            value={f.value}
            style={{ marginRight: '10px' }}
            checked={
              data[item.model] ? data[item.model].includes(f.value) : false
            }
            name={item.model}
            onChange={this.handleValueChange}
            label={f.text}
          />
        ));
      case 'dropdown':
        return (
          <Dropdown
            fluid
            placeholder={item.name}
            name={item.model}
            selection
            style={{ marginRight: '10px' }}
            options={item.options}
            onChange={this.handleValueChange}
            defaultValue={data[item.model]}
            clearable
          />
        );
      case 'multidropdown':
        return (
          <Dropdown
            fluid
            placeholder={item.name}
            name={item.model}
            multiple
            options={item.options}
            onChange={this.handleValueChange}
            defaultValue={data[item.model]}
            clearable
          />
        );
      case 'radio':
        return (
          <span className='ui radio checkbox'>
            {item.options.map((f) => (
              <Radio
                value={f.value}
                name={item.model}
                style={{ marginRight: '10px' }}
                onChange={this.handleValueChange}
                label={f.text}
                checked={data[item.model] === f.value}
              />
            ))}
          </span>
        );
      case 'switch':
        return (
          <Checkbox
            toggle
            name={item.model}
            onChange={this.handleValueChange}
            checked={data[item.model]}
          />
        );
      default:
        return (
          <Input
            fluid
            placeholder={item.name}
            name={item.model}
            value={data[item.model]}
            onChange={this.handleValueChange}
            type={item.formatType}
            maxLength={item.maxLength}
            minNumber={item.minNumber}
            maxNumber={item.maxNumber}
            regex={item.regex}
          />
        );
    }
  }

  protected handleValueChange(e, data) {
    let dataMerged;
    if (data.type === 'checkbox' && !data.toggle) {
      dataMerged = this.state.data[data.id || data.name] || [];
      if (data.checked) {
        dataMerged = {
          [data.id || data.name]: Array.from(
            new Set([...dataMerged, data.value]),
          ),
        };
      } else {
        dataMerged = {
          [data.id || data.name]: dataMerged.filter((tmp) => tmp !== data.value),
        };
      }
    } else if (data.type === 'checkbox' && data.toggle) {
      dataMerged = { [data.id || data.name]: data.checked };
    } else {
      let compValue = { [data.id || data.name]: data.value };
      if (data.type === 'number') {
        const { value, minNumber, maxNumber } = data;
        if (maxNumber !== undefined && Number(value) >= Number(maxNumber)) {
          compValue = { [data.id || data.name]: maxNumber };
        }
        if (minNumber !== undefined && Number(value) <= Number(minNumber)) {
          compValue = { [data.id || data.name]: minNumber };
        }
      } else if (data.regex) {
        if (data.value.match(data.regex) == null) {
          compValue = {
            [data.id || data.name]:
              _.get(this.state.data, data.id || data.name) || '',
          };
        }
      }
      dataMerged = compValue;
    }
    this.setState({
      data: Object.assign(this.state.data, dataMerged),
    });
  }

  protected handleFilterChange(e) {
    invoke(this.props, 'filterchange', e, {
      ...this.props,
      value: this.state.data,
    });
  }

  protected closePopup(e) {
    invoke(this.props, 'closePopup');
  }
}

export default Filter;
