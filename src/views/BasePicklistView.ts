import React from 'react';
import { SemanticCOLORS } from 'semantic-ui-react';

export interface BasePicklistViewProps {
  /** Used for passing picklist dom element to parent component. */
  onMount: (e: HTMLElement) => void;
  /** Called on picklist blur. */
  onBlur: () => void;
  /** Whether a picklist is inside a popup or inline. */
  inline: boolean;
  /** An array of values to fill a picklist with (dates, or years, or anything like that). */
  values: any[];
  rawData: any[];
  /** Fields configuration */
  fields?: object[];
  /** Called after clicking on particular value (date, year or anything like that). */
  onValueClick: (
    e: React.SyntheticEvent<HTMLElement>,
    data: OnValueClickData,
  ) => void;
  /** Called on picklist cell hover. */
  onCellHover: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
  /** Index of a cell that should be displayed as hovered. */
  hoveredItemIndex?: number;
  /** Moment date localization */
  localization?: string;
  /** handle change pagination */
  handlepagechange: (e?: React.SyntheticEvent<HTMLElement>, data?: any) => void;
  /** handle filter change */
  filterchange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
  closePopup: () => void;
  closable: boolean;
}

export interface SingleSelectionPicklistViewProps {
  /** Position of a cell to display as active. */
  activeItemIndex?: number;
  /** Position of a page to display as active. */
  page?: number;
  /** Position of a page to display as total page. */
  pages?: number;
  filtered?: any;
}

export interface HeadingValueProps {
  /** A value (date, year or anything like that) that is displayed in picklist header. */
  // currentHeadingValue: string;
  columns: string[];
}

export interface PicklistWithHeaderViewProps {
  /** Called after click on next page button. */
  onNextPageBtnClick: (
    e?: React.SyntheticEvent<HTMLElement>,
    data?: any,
    cb?: () => void,
  ) => void;
  /** Called after click on previous page button. */
  onPrevPageBtnClick: (
    e?: React.SyntheticEvent<HTMLElement>,
    data?: any,
    cb?: () => void,
  ) => void;
  /** Whether to display previous page button as active or disabled. */
  hasPrevPage: boolean;
  /** Whether to display next page button as active or disabled. */
  hasNextPage: boolean;
}

export interface OnValueClickData {
  [key: string]: any;
  /** Position of the clicked cell. */
  itemPosition: number;
  /** Text content of the clicked cell. */
  value: string;
}

/** Base class for picker view components. */
class BasePicklistView<
  P extends BasePicklistViewProps,
  S
> extends React.Component<P, S> {
  protected picklistNode: HTMLElement | undefined;

  public componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.picklistNode);
    }
  }
}

export default BasePicklistView;
