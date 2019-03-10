import { assert } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
import React from "react";
import _ from "lodash";

import PicklistInput from "../../src/inputs/PicklistInput";

describe("<PicklistInput />: handleSelect", () => {
  it("call `onChange` when in `day` mode (default)", () => {
    const onChangeFake = sinon.fake();
    const wrapper = mount(
      <PicklistInput valueFormat="${id}" onChange={onChangeFake} />
    );

    wrapper.instance().handleSelect("click", { value: { data: "test" } });
    const calledWithArgs = onChangeFake.args[0];

    assert(onChangeFake.calledOnce, "`onChange` callback called once");
    assert.equal(calledWithArgs[0], "click", "correct first argument");
    assert(_.isString(calledWithArgs[1].value), "value is string");
    assert.equal(calledWithArgs[1].value, "2030-05-03", "correct value");
  });

  // TODO: skipped because now mode switches in callback
  it.skip("does not switch to next mode if in single mode", () => {
    const onChangeFake = sinon.fake();
    const wrapper = mount(
      <PicklistInput
        valueFormat="${id}"
        startMode="single"
        onChange={onChangeFake}
      />
    );

    assert.equal(wrapper.state("mode"), "single", "mode not switched yet");
    wrapper.instance().handleSelect("click", { value: { year: 2030 } });
    assert.equal(wrapper.state("mode"), "single", "mode still not switched");
  });
});

describe("<PicklistInput />: switchToPrevMode", () => {
  const wrapper = mount(<PicklistInput />);

  beforeEach(function(done) {
    setTimeout(done);
  }, 0);

  it("not yet switched to previous mode", () => {
    assert.equal(wrapper.state("mode"), "day", "mode is not changed yet");
    wrapper.instance().switchToPrevMode();
  });

  it("switched to prev mode", () => {
    assert.equal(wrapper.state("mode"), "month", "mode changed to previous");
  }).timeout(0);
});

describe("<PicklistInput />: switchToNextMode", () => {
  const wrapper = mount(<PicklistInput />);

  beforeEach(function(done) {
    setTimeout(done);
  }, 0);

  it("not yet switched to next mode", () => {
    assert.equal(wrapper.state("mode"), "day", "mode is not changed yet");
    wrapper.instance().switchToNextMode();
  });

  it("switched to next mode", () => {
    assert.equal(wrapper.state("mode"), "year", "mode changed to next");
  }).timeout(0);
});
