import moment from 'moment';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Checkbox, Form, Header, Icon } from 'semantic-ui-react';

import { PicklistInput, PicklistInputOnChangeData } from '../src/inputs';

moment.locale('en');

const defaultState = {
  pick1: '',
  pick2: '',
  pick3: '',
  format: '{{name}} - {{notes}}',
  datasource: [
    { name: 'Jamie', status: 'Approved', notes: 'Requires call' },
    { name: 'John', status: 'Selected', notes: 'None' },
    { name: 'Jakun', status: 'Approved', notes: 'Requires call' },
    { name: 'Jill', status: 'Approved', notes: 'None' },
  ],
  fields: [
    {
      model: 'name',
      name: 'Name',
      type: 'string',
      searchFlag: true,
      displayFlag: false,
    },
    {
      model: 'status',
      name: 'Status',
      type: 'string',
      searchFlag: false,
      displayFlag: true,
    },
    {
      model: 'notes',
      name: 'Notes',
      type: 'string',
      searchFlag: false,
      displayFlag: true,
    },
  ],
};

type DateTimeFormHandleChangeData = PicklistInputOnChangeData;

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      clearable: false,
    };
  }

  public render() {
    return (
      <div className='example-picklist-container'>
        <Header as='h2' dividing>
          As text fields
          <Header.Subheader>
            <Checkbox
              label='Make data inputs clearable'
              checked={this.state.clearable}
              onChange={this.handleCheckboxChange.bind(this)}
            />
          </Header.Subheader>
        </Header>

        <DateTimeForm clearable={this.state.clearable} />
        <h2>Inline</h2>
        <DateTimeFormInline />
      </div>
    );
  }

  private handleCheckboxChange() {
    this.setState(() => ({
      clearable: !this.state.clearable,
    }));
  }
}

class DateTimeForm extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  public render() {
    const { clearable } = this.props;
    const {
      pick1: pick1Value,
      pick2: pick2Value,
      format,
      datasource,
      fields,
      url,
    } = this.state;

    return (
      <Form>
        <PicklistInput
          placeholder='Sample Picklist 01'
          popupPosition='bottom right'
          className='example-picklist-input'
          name='pick1'
          closable
          clearIcon={<Icon name='remove' color='red' />}
          clearable={clearable}
          animation='scale'
          duration={200}
          value={pick1Value}
          iconPosition='left'
          preserveViewMode={false}
          autoComplete='off'
          onChange={this.handleChange}
          format={format}
          datasource={datasource}
          fields={fields}
          url={url}
        />
        <br />
        <PicklistInput
          startMode='single'
          popupPosition='bottom right'
          placeholder='Sample Picklist 02'
          className='example-picklist-input'
          name='pick2'
          animation='fly left'
          duration={300}
          closable
          clearable={clearable}
          value={pick2Value}
          iconPosition='left'
          autoComplete='off'
          preserveViewMode={false}
          onChange={this.handleChange}
          format={format}
          datasource={datasource}
          fields={fields}
          url={url}
        />
      </Form>
    );
  }

  private handleChange = (
    event: React.SyntheticEvent,
    { name, value }: DateTimeFormHandleChangeData,
  ) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
}

class DateTimeFormInline extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  public render() {
    const { format, datasource, fields, url, pick3: pick3Value } = this.state;

    return (
      <Form>
        <PicklistInput
          className='example-picklist-input'
          value={pick3Value}
          name='pick3'
          inline
          onChange={this.handleChange}
          format={format}
          datasource={datasource}
          fields={fields}
          url={url}
        />
      </Form>
    );
  }

  private handleChange = (
    event: React.SyntheticEvent,
    { name, value }: DateTimeFormHandleChangeData,
  ) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
}

ReactDOM.render(<App />, document.getElementById('root'));
