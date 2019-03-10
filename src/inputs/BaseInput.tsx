import { Moment } from "moment";
import * as React from "react";
import {
  SemanticTRANSITIONS,
  SemanticCOLORS,
  SemanticICONS
} from "semantic-ui-react";

// import { TimeFormat } from "../pickers/BasePicker";
import moment = require("moment");
import { MarkedType } from "../lib/CustomPropTypes";

export interface BaseInputProps {
  [key: string]: any;
  /** Currently selected value. */
  value: string;
  /** Called on selected value change. */
  onChange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
  /** If true, popup closes after selecting a value. */
  closable?: boolean;
  /** An input can be formatted to appear inline in other content. */
  inline?: boolean;
  /** Optional icon to display inside the Input. */
  icon?: SemanticICONS | false;
  /** Icon position inside Input. Default: 'right'. */
  iconPosition?: "right" | "left";
  /**
   * Called on clear.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClear?: (event: React.SyntheticEvent<HTMLInputElement>, data: any) => void;
  /** Using the clearable setting will let users remove their selection from a picklist. */
  clearable?: boolean;
  /** Optional Icon to display inside the clearable Input. */
  clearIcon?: any;
  /** Position for the popup. */
  popupPosition?:
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right"
    | "right center"
    | "left center"
    | "top center"
    | "bottom center";
  /** Should close when cursor leaves picklist popup. */
  closeOnMouseLeave?: boolean;
  /** The node where the picker should mount. */
  mountNode?: any;
  /** A field can have its label next to instead of above it. */
  inlineLabel?: boolean;
  /** Picker width (any value that `style.width` can take). */
  pickerWidth?: string;
  /** Style object for picker. */
  pickerStyle?: object;
  /** Duration of the CSS transition animation in milliseconds. */
  duration?: number;
  /** Named animation event to used. Must be defined in CSS. */
  animation?: SemanticTRANSITIONS;
  /** Moment date localization. */
  localization?: string;
}
export interface DateRelatedProps {
  /** Moment date formatting string. */
  valueFormat?: string;
  /** Date to display initially when no date is selected. */
  initialValue?: string;
}

export interface BaseInputState {
  popupIsClosed: boolean;
}

abstract class BaseInput<
  P extends BaseInputProps,
  S extends BaseInputState
> extends React.Component<P, S> {
  public static defaultProps = {
    inline: false
  };

  private picklistNode: HTMLElement;
  private inputNode: HTMLElement;

  protected closePopup = (): void => {
    this.setState({ popupIsClosed: true });
  };

  protected openPopup = (): void => {
    this.setState({ popupIsClosed: false });
  };

  protected isPickerInFocus = (): boolean => {
    return document.activeElement === this.picklistNode;
  };

  protected isTriggerInFocus = (): boolean => {
    return document.activeElement === this.inputNode;
  };

  protected onModeSwitch = (): void => {
    // when using keyboard for selecting values on inline picklist
    // and when mode switches, picker looses focus.
    // In order to preserve focus on active picker
    // we call focus() on `picklistNode`.
    // `picklistNode` goes from *View component via
    // `this.onPicklistViewMount` callback
    if (this.props.inline && !this.isPickerInFocus() && this.picklistNode) {
      this.picklistNode.focus();
    }
  };

  protected onPicklistViewMount = (picklistNode: HTMLElement): void => {
    this.picklistNode = picklistNode;
  };

  protected onInputViewMount = (inputNode: HTMLElement): void => {
    this.inputNode = inputNode;
  };
}

export default BaseInput;
