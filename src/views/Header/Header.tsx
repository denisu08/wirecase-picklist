import React from 'react';
import { Table } from 'semantic-ui-react';

export interface HeaderProps {
  /** Header text content. */
  columns: any[];
  /** Called after click on next page button. */
  onNextPageBtnClick: () => void;
  /** Called after click on previous page button. */
  onPrevPageBtnClick: () => void;
  /** Whether to display previous page button as active or disabled. */
  hasPrevPage: boolean;
  /** Whether to display next page button as active or disabled. */
  hasNextPage: boolean;
  /** Moment date localization */
  localization?: string;
}

function Header(props: HeaderProps) {
  const { columns } = props;

  return (
    <React.Fragment>
      <Table.Header>
        <Table.Row>
          {columns.map((item, index) => (
            <Table.HeaderCell key={`header-${index}`}>
              {item.name}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    </React.Fragment>
  );
}

export default Header;
