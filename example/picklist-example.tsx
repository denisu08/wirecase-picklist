import moment from 'moment';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Checkbox, Form, Header, Icon } from 'semantic-ui-react';
import * as _ from 'lodash';

import { PicklistInput, PicklistInputOnChangeData } from '../src/inputs';

moment.locale('en');

const defaultState = {
  pick1: '',
  pick2: '',
  pick3: '',
  format: '{{url}}, {{author}}',
  fetchurl:
    'https://hn.algolia.com/api/v1/search?query={{author}}&page={{page}}&hitsPerPage={{pageSize}}',
  fetchkey: { pages: 'nbPages', page: 'page', data: 'hits' },
  datasource: [
    { name: 'Jamie', status: 'Approved', notes: 'Requires call' },
    { name: 'John', status: 'Selected', notes: 'None' },
    { name: 'Jakun', status: 'Approved', notes: 'Requires call' },
    { name: 'Jill', status: 'Rejected', notes: 'None' },
    { name: 'Blown', status: 'Approved', notes: 'Requires call' },
    // remove below if paging
    { name: 'Googie', status: 'Selected', notes: 'Requires call' },
    // { name: 'Pawn', status: 'Selected', notes: 'None' },
    // { name: 'Sessy', status: 'Approved', notes: 'Requires call' },
    // { name: 'Poland', status: 'Rejected', notes: 'None' },
    // { name: 'Kung', status: 'Approved', notes: 'Requires call' },
    // { name: 'Jing', status: 'Rejected', notes: 'None' },
    // { name: 'Mindel', status: 'Approved', notes: 'Requires call' },
    // { name: 'Plotty', status: 'Selected', notes: 'None' },
  ],
  fields: [
    {
      model: 'title',
      name: 'Title',
      type: 'string',
      formatType: 'number',
      searchFlag: true,
      displayFlag: true,
    },
    {
      model: 'url',
      name: 'URL',
      type: 'string',
      searchFlag: true,
      displayFlag: false,
    },
    {
      model: 'author',
      name: 'Author',
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
        {/* <h2>Inline</h2>
        <DateTimeFormInline /> */}
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
      fetchurl,
      fetchkey,
      page,
      pages,
      filtered: prevFiltered,
    } = this.state;

    return (
      <Form>
        {/* <PicklistInput
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
          fetchurl={fetchurl}
          fetchkey={fetchkey}
        />
        <br /> */}
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
          page={page || 0}
          pages={pages || 2}
          filtered={prevFiltered || {}}
          iconPosition='left'
          autoComplete='off'
          preserveViewMode={false}
          onChange={this.handleChange}
          /* onFetchEvent={(param) => {
            const { page: currentPage, filtered } = param;
            const newDS = [
              { name: 'Jamie', status: 'Approved', notes: 'Requires call' },
              { name: 'John', status: 'Selected', notes: 'None' },
              { name: 'Jakun', status: 'Approved', notes: 'Requires call' },
              { name: 'Jill', status: 'Rejected', notes: 'None' },
              { name: 'Blown', status: 'Approved', notes: 'Requires call' },
              { name: 'Googie', status: 'Selected', notes: 'Requires call' },
              { name: 'Pawn', status: 'Selected', notes: 'None' },
              { name: 'Sessy', status: 'Approved', notes: 'Requires call' },
              { name: 'Poland', status: 'Rejected', notes: 'None' },
              { name: 'Kung', status: 'Approved', notes: 'Requires call' },
              { name: 'Jing', status: 'Rejected', notes: 'None' },
              { name: 'Mindel', status: 'Approved', notes: 'Requires call' },
              { name: 'Plotty', status: 'Selected', notes: 'None' },
            ].filter((item) => {
              let isValid = true;
              if (filtered) {
                Object.keys(filtered).forEach((keyFilter) => {
                  if (_.has(item, keyFilter)) {
                    isValid =
                      _.get(item, keyFilter).indexOf(filtered[keyFilter]) >= 0;
                    if (!isValid) {
                      return;
                    }
                  }
                });
              }

              return isValid;
            });
            const indexPage = Math.abs(currentPage || 0);
            let startIndex = 5 * indexPage;
            if (startIndex >= newDS.length) {
              startIndex = 0;
            }
            const endIndex = Math.min(5 * indexPage + 5, newDS.length);
            const totalPage = Math.ceil(newDS.length / 5);
            const dataChopped =
              newDS && newDS.length >= startIndex
                ? newDS.slice(startIndex, endIndex)
                : newDS;
            this.setState({
              datasource: dataChopped,
              page: currentPage,
              pages: totalPage,
              filtered,
            });
          }}*/
          format='{{name}}, {{status}}'
          datasource={datasource}
          isCSensitive={false}
          fields={[
            {
              model: 'name',
              name: 'Name',
              type: 'string',
              placeholder: 'Name Placeholder',
              searchFlag: true,
              displayFlag: true,
              formatType: 'string',
              maxLength: 5,
              regex: '^[a-zA-Z ]*$',
            },
            {
              model: 'status',
              placeholder: 'Status Placeholder',
              name: 'Status',
              type: 'string',
              searchFlag: true,
              displayFlag: false,
            },
            {
              model: 'notes',
              placeholder: 'Notes Placeholder',
              name: 'Notes',
              type: 'multidropdown',
              searchFlag: true,
              displayFlag: true,
              options: [
                { text: 'Requires call', value: 'Requires call' },
                { text: 'None', value: 'None' },
              ],
            },
          ]}
        />
      </Form>
    );
  }

  private handleChange = (
    event: React.SyntheticEvent,
    { name, value, rowData }: DateTimeFormHandleChangeData,
  ) => {
    const { page, pages } = this.state;
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value, page, pages });
    }
  }
}

class DateTimeFormInline extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  public render() {
    const {
      format,
      datasource,
      fields,
      fetchkey,
      fetchurl,
      pick3: pick3Value,
    } = this.state;

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
          fetchurl={fetchurl}
          fetchkey={fetchkey}
        />
      </Form>
    );
  }

  private handleChange = (
    event: React.SyntheticEvent,
    { name, value }: DateTimeFormHandleChangeData,
  ) => {
    const { page, pages } = this.state;
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value, page, pages });
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
