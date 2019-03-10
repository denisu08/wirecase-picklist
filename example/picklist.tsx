import moment from "moment";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Checkbox, Form, Header, Icon } from "semantic-ui-react";

import { PicklistInput, PicklistInputOnChangeData } from "../src/inputs";

moment.locale("en");

type DateTimeFormHandleChangeData = PicklistInputOnChangeData;

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      clearable: false
    };
  }

  public render() {
    return (
      <div className="example-picklist-container">
        <Header as="h2" dividing>
          As text fields
          <Header.Subheader>
            <Checkbox
              label="Make data inputs clearable"
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
      clearable: !this.state.clearable
    }));
  }
}

class DateTimeForm extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      year: "",
      date: "",
      dateStartYear: "",
      time: "",
      dateTime: "",
      datesRange: "",
      month: "",
      monthRange: ""
    };
  }

  public render() {
    const { clearable } = this.props;

    return (
      <Form>
        <PicklistInput
          placeholder="Sample Picklist 01"
          popupPosition="bottom right"
          className="example-picklist-input"
          name="date"
          closable
          clearIcon={<Icon name="remove" color="red" />}
          clearable={clearable}
          animation="scale"
          duration={200}
          value={this.state.date}
          iconPosition="left"
          preserveViewMode={false}
          autoComplete="off"
          onChange={this.handleChange}
        />
        <br />
        <PicklistInput
          startMode="single"
          popupPosition="bottom right"
          placeholder="Sample Picklist 02"
          className="example-picklist-input"
          name="dateStartYear"
          animation="fly left"
          duration={300}
          closable
          clearable={clearable}
          value={this.state.dateStartYear}
          iconPosition="left"
          autoComplete="off"
          preserveViewMode={false}
          onChange={this.handleChange}
        />
      </Form>
    );
  }

  private handleChange = (
    event: React.SyntheticEvent,
    { name, value }: DateTimeFormHandleChangeData
  ) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
}

class DateTimeFormInline extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      year: "",
      month: "",
      date: "",
      time: "",
      dateTime: "",
      datesRange: "",
      monthRange: ""
    };
  }

  public render() {
    return (
      <Form>
        <PicklistInput
          className="example-picklist-input"
          value={this.state.date}
          name="date"
          inline
          onChange={this.handleChange}
          disable={new Date("03/01/2019")}
          marked={[new Date("03/01/2019"), new Date("03/20/2019")]}
          markedtip={[
            { date: "01/03/2019", tip: "XMast" },
            { date: "20/03/2019", tip: "Lebaran" }
          ]}
          markColor="orange"
        />
      </Form>
    );
  }

  private handleChange = (
    event: React.SyntheticEvent,
    { name, value }: DateTimeFormHandleChangeData
  ) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
}

ReactDOM.render(<App />, document.getElementById("root"));
