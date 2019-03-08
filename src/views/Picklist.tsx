import React from 'react';
import { Table, Form, Button } from 'semantic-ui-react';
import { Filter } from './Filter';

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
        <Filter />
        <Table style={style} unstackable celled {...rest} textAlign='center' className='selectable' size='small'>
          {children}
        </Table>
      </React.Fragment>
    );
  }
}

export default Picklist;
