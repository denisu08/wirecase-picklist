import React from 'react';
import { Table, Pagination, Segment } from 'semantic-ui-react';
import { Filter } from './Filter';
import invoke from 'lodash/invoke';

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
  /** Fields configuration */
  fields?: object[];
  /** Position of a page to display as active. */
  page?: number;
  /** Position of a page to display as total page. */
  pages?: number;
  handlepagechange: (e?: React.SyntheticEvent<HTMLElement>, data?: any) => void;
  /** handle filter change */
  filterchange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
}

// const rowBtnStyle = {
//   cursor: 'pointer',
// };

class Picklist extends React.Component<PicklistProps, any> {
  public static readonly propTypes: object;
  public static readonly defaultProps = {
    pickerWidth: '100%',
  };

  public state = {
    page: 0,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
    pageSize: 5,
  };

  constructor(props) {
    super(props);

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  public handlePaginationChange(
    e?: React.SyntheticEvent<HTMLElement>,
    data?: any,
  ) {
    const { activePage } = data;
    this.setState({ page: activePage });
    invoke(this.props, 'handlepagechange', e, {
      ...this.props,
      value: activePage,
    });
  }

  public render() {
    const {
      children,
      outlineOnFocus,
      pickerWidth,
      pickerStyle,
      fields,
      page,
      pages,
      filterchange,
      ...rest
    } = this.props;

    const style = {
      margin: '0px',
      width: pickerWidth,
      minWidth: '22em',
      // Prevent poped up picker from beeing outlined on focus.
      // Inline picker should be outlined when in focus.
      outline: outlineOnFocus ? undefined : 'none',
      ...pickerStyle,
    };

    return (
      <div>
        <Filter fields={fields} filterchange={filterchange} />
        <Table
          style={style}
          unstackable
          compact
          celled
          {...rest}
          textAlign='center'
          className='selectable'
          size='small'
        >
          {children}
        </Table>
        {pages && pages > 0 ? (
          <div style={{ textAlign: 'center', margin: '5px' }}>
            <Pagination
              onPageChange={this.handlePaginationChange}
              totalPages={pages || 0}
              prevItem={undefined}
              nextItem={undefined}
              firstItem={undefined}
              lastItem={undefined}
              boundaryRange={0}
              defaultActivePage={1}
              ellipsisItem={null}
              siblingRange={1}
            />
          </div>
        ) : (
          'kosong'
        )}
      </div>
    );
  }
}

export default Picklist;
