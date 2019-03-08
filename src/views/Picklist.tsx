import React from 'react';
import { Table, Form, Checkbox, Button } from 'semantic-ui-react';

// interface PickerStyle {
//   [key: string]: any;
//   width?: string;
//   minWidth?: string;
// }

interface PicklistProps {
  /** Table content. */
  children: React.ReactNode[];
  /** Whether to outline the picklist on focus. */
  outlineOnFocus: boolean;
  /** Picker width (any value that `style.width` can take). */
  pickerWidth?: string;
  /** Style object for picker. */
  pickerStyle?: object;
}

class Picklist extends React.Component<PicklistProps, any> {
  public static readonly propTypes: object;
  public static readonly defaultProps = {
    pickerWidth: '100%',
  };

  public render() {
    const {
      children,
      outlineOnFocus,
      pickerWidth,
      pickerStyle,
      ...rest
    } = this.props;
    const style = {
      width: pickerWidth,
      minWidth: '22em',
      // Prevent poped up picker from beeing outlined on focus.
      // Inline picker should be outlined when in focus.
      outline: outlineOnFocus ? undefined : 'none',
      ...pickerStyle,
    };
    const rowBtnStyle = {
      cursor: 'pointer',
    };

    return (
      <React.Fragment>
        <Form style={{ margin: '5px' }} size='tiny'>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Button type='button' fluid size='tiny'>
            Search
          </Button>
        </Form>

        {/* <Table celled className='selectable' size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row style={rowBtnStyle}>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell>Requires call</Table.Cell>
            </Table.Row>
            <Table.Row style={rowBtnStyle}>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>Selected</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row style={rowBtnStyle}>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell>Requires call</Table.Cell>
            </Table.Row>
            <Table.Row style={rowBtnStyle}>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table> */}

        <Table style={style} unstackable celled {...rest} textAlign='center' className='selectable' size='small'>
          {children}
        </Table>

        {/* <Table style={style} unstackable celled {...rest} textAlign='center'>
          {children}
        </Table> */}
      </React.Fragment>
    );
  }
}

export default Picklist;
