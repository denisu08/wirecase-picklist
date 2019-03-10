import React from "react";

import BasePicklistView, {
  BasePicklistViewProps,
  SingleSelectionPicklistViewProps
} from "./BasePicklistView";
import Picklist from "./Picklist";
import Body from "./Body/Body";
import Header from "./Header/Header";

import { findHTMLElement } from "../lib";

export const PICKLIST_ROW_WIDTH = 7;

type PicklistViewProps = BasePicklistViewProps &
  SingleSelectionPicklistViewProps;

class PicklistView extends BasePicklistView<PicklistViewProps, any> {
  public render() {
    const {
      values,
      onValueClick,
      disabledItemIndexes,
      activeItemIndex,
      hoveredItemIndex,
      onCellHover,
      onMount,
      inline,
      markedItemIndexes,
      markedtipIndexes,
      markColor,
      localization,
      ...rest
    } = this.props;

    return (
      <Picklist
        ref={e => (this.picklistNode = findHTMLElement(e))}
        outlineOnFocus={inline}
        {...rest}
      >
        <Header width={PICKLIST_ROW_WIDTH} localization={localization} />
        <Body
          width={PICKLIST_ROW_WIDTH}
          data={values}
          hovered={hoveredItemIndex}
          onCellHover={onCellHover}
          onCellClick={onValueClick}
          active={activeItemIndex}
          disabled={disabledItemIndexes}
        />
      </Picklist>
    );
  }
}

export default PicklistView;
