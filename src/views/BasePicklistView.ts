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
  values: string[];
  /** Called after clicking on particular value (date, year or anything like that). */
  onValueClick: (
    e: React.SyntheticEvent<HTMLElement>,
    data: OnValueClickData,
  ) => void;
  /** Called on picklist cell hover. */
  onCellHover: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
  /** Index of a cell that should be displayed as hovered. */
  hoveredItemIndex?: number;
  /** An array of cell positions to display as disabled. */
  disabledItemIndexes?: number[];
  /** An array of cell positions to display as marked. */
  markedItemIndexes?: number[];
  markedtipIndexes?: any;
  /** An array of cell positions to display as marked. */
  markColor?: SemanticCOLORS;
  /** Moment date localization */
  localization?: string;
}

export interface SingleSelectionPicklistViewProps {
  /** Position of a cell to display as active. */
  activeItemIndex?: number;
}

export interface RangeIndexes {
  start: number | undefined;
  end: number | undefined;
}

export interface RangeSelectionPicklistViewProps {
  /** Currently selected range value (from - to) that is displayed in picklist header. */
  currentRangeHeadingValue: string;
  /** Indexes of start and end values of currently selected range (to display as active). */
  activeRange: RangeIndexes;
}

export interface HeadingValueProps {
  /** A value (date, year or anything like that) that is displayed in picklist header. */
  currentHeadingValue: string;
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
  // /** Called after click on calendar header. */
  // onHeaderClick: () => void;
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
