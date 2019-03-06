# wirecase-picklist
Picklist react component based on semantic-ui-react components

# installation
```
npm i wirecase-picklist
```

# usage
Let's create a form that needs date-related input fields.

Import input components:

```javascript
import {
  PicklistInput
} from 'wirecase-picklist';
```
Then build a form:

```javascript
class PicklistForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <Form>
        <PicklistInput
          value=''
          onChange={this.handleChange}
        />
    );
  }
}
```

# Supported elements

### PicklistInput

| Prop                                      | Description                                                 |
| ----------------------------------------- | ----------------------------------------------------------- |
| all that can be used with SUIR Form.Input |                                                             |
| ``value``                                 | {string} value selected by picklist. Default: ``undefined`` |
