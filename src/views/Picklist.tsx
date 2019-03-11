import React from 'react';
import { Table, Pagination, Segment } from 'semantic-ui-react';
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

const rowBtnStyle = {
  cursor: 'pointer',
};

class Picklist extends React.Component<PicklistProps, any> {
  public static readonly propTypes: object;
  public static readonly defaultProps = {
    pickerWidth: '100%',
  };

  public state = {
    activePage: 5,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
    totalPages: 50,
  };

  constructor(props) {
    super(props);

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  public handlePaginationChange(e, data) {
    const { activePage } = data;
    console.log('activePage', activePage);
    this.setState({ activePage });
  }

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

    const {
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages,
    } = this.state;

    return (
      <div>
        <Filter />
        <Table
          style={style}
          unstackable
          celled
          {...rest}
          textAlign='center'
          className='selectable'
          size='small'
        >
          {children}
        </Table>
        <div style={{ textAlign: 'right', margin: '0 10px 10px 0' }}>
          <Pagination
            onPageChange={this.handlePaginationChange}
            size='mini'
            totalPages={totalPages}
            prevItem={showPreviousAndNextNav ? undefined : null}
            nextItem={showPreviousAndNextNav ? undefined : null}
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={showFirstAndLastNav ? undefined : null}
            lastItem={showFirstAndLastNav ? undefined : null}
            siblingRange={1}
          />
        </div>
      </div>
    );
  }
}

export default Picklist;
