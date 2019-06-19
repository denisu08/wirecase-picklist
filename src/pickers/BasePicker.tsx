import keyboardKey from 'keyboard-key';
import React from 'react';

interface HandleChangeParams {
  value?: string;
  itemPosition?: number;
}

export interface BasePickerOnChangeData {
  [key: string]: any;
  value: {
    /** Data. */
    data?: string;
  };
}

export interface BasePickerProps {
  /** Called after day is selected. */
  onChange: (
    e: React.SyntheticEvent<HTMLElement>,
    data: BasePickerOnChangeData,
  ) => void;
  onFetchEvent: (parameter: any) => void;
  /** Currently selected date. */
  value?: string;
  /** Format Value. */
  format?: string;
  /** Currently selected date. */
  datasource?: object[];
  /** Field Configuration. */
  fields?: any[];
  /** URL to fetch data */
  fetchurl?: string;
  fetchkey?: any;
  /** A value for initializing day picker's state. */
  initial: string;
  /** Forse popup to close. */
  closePopup: () => void;
  /** Whether to display picker without a popup or inside a popup. */
  inline: boolean;
  /** WHether picker in focus. */
  isPickerInFocus: () => boolean;
  /** Whether popup-trigger in focus. */
  isTriggerInFocus: () => boolean;
  /** Used to pass underlying picker's html element to parent component. */
  onPicklistViewMount: (e: HTMLElement) => void;
  /** Moment date localization */
  localization?: string;
  tabIndex?: string;
  pickerWidth?: string;
  pickerStyle?: object;
  pageSize?: number;
  page?: number;
  pages?: number;
}

export interface OptionalHeaderProps {
  /** Whether to display picklist's header. */
  hasHeader: boolean;
}

export interface BasePickerState extends Readonly<any> {
  /** Position of a cell that is currently hovered on. */
  hoveredCellPosition: number | undefined;
  /** Inner picker's currently selected data. */
  data: string;
}

/** Do not expose this class. Instead use RangeSelectionPicker and SingleSelectionPicker. */
abstract class BasePicker<P extends BasePickerProps> extends React.Component<
  P,
  BasePickerState
> {
  protected PAGE_WIDTH: number;

  constructor(props: P) {
    super(props);
    this.state = {
      hoveredCellPosition: undefined,
      data: this.props.initial,
    };
  }

  public componentDidMount(): void {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  protected onHoveredCellPositionChange = (
    e: React.SyntheticEvent<HTMLElement>,
    { itemPosition }: { itemPosition: number },
  ): void => {
    this.setState({
      hoveredCellPosition: itemPosition,
    });
  }

  protected canPicklistCatchKeyboardEvents = (): boolean => {
    if (this.props.inline) {
      return this.props.isPickerInFocus();
    }

    return this.props.isTriggerInFocus();
  }

  protected handleKeyPress = (event: KeyboardEvent): void => {
    if (!this.canPicklistCatchKeyboardEvents()) {
      return;
    }
    const key = keyboardKey.getKey(event);

    switch (key) {
      case 'Enter':
        this.handleEnterKeyPress(event);
        break;
      case 'Escape':
        this.props.closePopup();
        break;
      default:
        this.handleArrowKeyPress(event);
    }
  }

  protected handleEnterKeyPress = (event: KeyboardEvent): void => {
    const key = keyboardKey.getKey(event);
    if (key === 'Enter' && this.canPicklistCatchKeyboardEvents()) {
      event.preventDefault();
      const selectedValue = this.buildPicklistValues()[
        this.state.hoveredCellPosition
      ];
      this.handleChange(null, {
        value: `${selectedValue}`,
        itemPosition: this.state.hoveredCellPosition,
      });
    }
  }

  protected handleBlur = (): void => {
    this.props.closePopup();
  }

  protected handleArrowKeyPress = (event: KeyboardEvent): void => {
    if (!this.canPicklistCatchKeyboardEvents()) {
      return;
    }
    const key = keyboardKey.getKey(event);
    // const selectableCells = this.getSelectableCellPositions();
    // const nextSelectableCellPositionLeft = selectableCells
    //   .slice(0, selectableCells.indexOf(this.state.hoveredCellPosition))
    //   .pop();
    // const nextSelectableCellPositionRight = selectableCells.slice(
    //   selectableCells.indexOf(this.state.hoveredCellPosition) + 1
    // )[0];
    switch (key) {
      //   case "ArrowLeft":
      //     event.preventDefault();
      //     if (!isNil(nextSelectableCellPositionLeft)) {
      //       this.onHoveredCellPositionChange(null, {
      //         itemPosition: nextSelectableCellPositionLeft
      //       });
      //     } else {
      //       if (this.isPrevPageAvailable()) {
      //         this.switchToPrevPage(null, null, () => {
      //           const selectableCellsPrevPage = this.getSelectableCellPositions();
      //           this.onHoveredCellPositionChange(null, {
      //             itemPosition:
      //               selectableCellsPrevPage[selectableCellsPrevPage.length - 1]
      //           });
      //         });
      //       }
      //     }
      //     break;
      //   case "ArrowRight":
      //     event.preventDefault();
      //     if (!isNil(nextSelectableCellPositionRight)) {
      //       this.onHoveredCellPositionChange(null, {
      //         itemPosition: nextSelectableCellPositionRight
      //       });
      //     } else {
      //       if (this.isNextPageAvailable()) {
      //         this.switchToNextPage(null, null, () => {
      //           const selectableCellsNextPage = this.getSelectableCellPositions();
      //           this.onHoveredCellPositionChange(null, {
      //             itemPosition: selectableCellsNextPage[0]
      //           });
      //         });
      //       }
      //     }
      //     break;

      // case "ArrowUp":
      //   event.preventDefault();
      //   if (
      //     includes(
      //       selectableCells,
      //       this.state.hoveredCellPosition - this.PAGE_WIDTH
      //     )
      //   ) {
      //     this.onHoveredCellPositionChange(null, {
      //       itemPosition: this.state.hoveredCellPosition - this.PAGE_WIDTH
      //     });
      //   }
      //   break;
      // case "ArrowDown":
      //   event.preventDefault();
      //   if (
      //     includes(
      //       selectableCells,
      //       this.state.hoveredCellPosition + this.PAGE_WIDTH
      //     )
      //   ) {
      //     this.onHoveredCellPositionChange(null, {
      //       itemPosition: this.state.hoveredCellPosition + this.PAGE_WIDTH
      //     });
      //   }
      //   break;
      default:
        break;
    }
  }

  /** Return a position of a value (date, year, month ...) with wich a picklist was initialized. */
  // protected abstract getInitialDatePosition(): number;

  /** Creates values with wich picklist filled. */
  protected abstract buildPicklistValues(): object[];

  /** Handles currently selected value change. */
  protected abstract handleChange(
    e: React.SyntheticEvent<HTMLElement>,
    data: HandleChangeParams,
  ): void;
}

export abstract class SingleSelectionPicker<
  P extends BasePickerProps
> extends BasePicker<P> {
  public componentDidMount(): void {
    super.componentDidMount();
    // const active = this.getActiveCellPosition();
    // this.setState({
    //   hoveredCellPosition: isNumber(active)
    //     ? active
    //     : this.getInitialDatePosition(),
    // });

    // this.setState({
    //   allData: [],
    //   listData: [],
    //   pageSize: 5,
    //   pages: 0,
    //   page: 1,
    // });
  }

  // protected abstract getActiveCellPosition(): number | undefined;
}
