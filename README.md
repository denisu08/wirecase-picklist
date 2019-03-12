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
          format='{{name}}, {{status}}'
          datasource={[
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
          ]}
          fields={[
            {
              model: 'name',
              name: 'Name',
              type: 'string',
              searchFlag: true,
              displayFlag: true,
            },
            {
              model: 'status',
              name: 'Status',
              type: 'string',
              searchFlag: true,
              displayFlag: false,
            },
            {
              model: 'notes',
              name: 'Notes',
              type: 'string',
              searchFlag: false,
              displayFlag: true,
            },
          ]}
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
| ``popupPosition``| {string} One of ['top left', 'top right', 'bottom left', 'bottom right', 'right center', 'left center', 'top center', 'bottom center']. Default: ``top left``|
| ``inline`` | {bool} If ``true`` inline picker displayed. Default: ``false`` |
| ``closable`` | {bool} If true, popup closes after selecting a date   |
| ``initialValue`` | {string} For setting some default value just set into `value` prop). |
| ``closeOnMouseLeave`` | {bool} Should close when cursor leaves calendar popup. Default: ``true`` |
| ``mountNode`` | {any} The node where the picker should mount. |
| ``onClear`` | {func} Called after clear icon has clicked. |
| ``clearable`` | {boolean} Using the clearable setting will let users remove their selection from a calendar. |
| ``clearIcon`` | {any} Optional Icon to display inside the clearable Input. |
| ``pickerWidth`` | {string} Optional width value for picker (any string value that could be assigned to `style.width`). |
| ``pickerStyle`` | {object} Optional `style` object for picker. |
| ``duration`` | {number} Optional duration of the CSS transition animation in milliseconds. Default: `200` |
| ``animation`` | {string} Optional named animation event to used. Must be defined in CSS. Default: `'scale'` |
| ``icon`` | {string\|false} icon to display inside Input. |
| ``iconPosition`` | {'left'\|'right'} icon position inside Input. Default: 'right'. |
| ``format`` | {'left'\|'right'} icon position inside Input. Default: 'right'. |
| ``datasource`` | {'left'\|'right'} icon position inside Input. Default: 'right'. |
| ``fields`` | {'left'\|'right'} icon position inside Input. Default: 'right'. |
| ``fetchurl`` | {'left'\|'right'} icon position inside Input. Default: 'right'. |
| ``fetchkey`` | {'left'\|'right'} icon position inside Input. Default: 'right'. |