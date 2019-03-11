// import { assert } from "chai";
// import * as Enzyme from "enzyme";
// import * as Adapter from "enzyme-adapter-react-16";
// import moment from "moment";
// import { shallow } from "enzyme";
// import * as sinon from "sinon";
// import * as React from "react";
// import { Table, Icon } from "semantic-ui-react";
// import * as _ from "lodash";

// import { Header } from "../../src/views/Header";

// describe("<Header />", () => {
//   it("consists of proper elements", () => {
//     const wrapper = shallow(
//       <Header
//         title="any text"
//         hasNextPage
//         hasPrevPage
//         displayWeeks
//         width="7"
//         onNextPageBtnClick={() => {}}
//         onPrevPageBtnClick={() => {}}
//       />
//     );
//     assert(wrapper.is(Table.Header), "top node is Table.Header");
//     assert.equal(
//       wrapper.find(Table.Row).getElements().length,
//       1,
//       "has one <Table.Row />"
//     );
//     assert.equal(
//       wrapper.find(HeaderWeeks).getElements().length,
//       1,
//       "has one <HeaderWeeks />"
//     );
//     assert.isFalse(
//       wrapper.find(HeaderRange).exists(),
//       "does not have <HeaderRange />"
//     );
//   });

//   it("sets title properly", () => {
//     const wrapper = shallow(
//       <Header
//         title="any text"
//         hasNextPage
//         hasPrevPage
//         displayWeeks
//         width="7"
//         onNextPageBtnClick={() => {}}
//         onPrevPageBtnClick={() => {}}
//       />
//     );
//     assert.equal(
//       wrapper
//         .find(Table.HeaderCell)
//         .at(1)
//         .children()
//         .first()
//         .text(),
//       "any text",
//       "node contains value from `title` prop"
//     );
//   });

//   it("does not display weeks row if `displayWeeks` is false", () => {
//     const wrapper = shallow(
//       <Header
//         title="any text"
//         hasNextPage
//         hasPrevPage
//         displayWeeks={false}
//         width="7"
//         onNextPageBtnClick={() => {}}
//         onPrevPageBtnClick={() => {}}
//       />
//     );
//     assert.isFalse(
//       wrapper.find(HeaderWeeks).exists(),
//       "does not have <HeaderWeeks />"
//     );
//   });

//   it("display range row if `rangeRowContent` provided", () => {
//     const wrapper = shallow(
//       <Header
//         title="any text"
//         hasNextPage
//         hasPrevPage
//         displayWeeks
//         width="7"
//         onNextPageBtnClick={() => {}}
//         onPrevPageBtnClick={() => {}}
//         rangeRowContent="any text"
//       />
//     );
//     assert(wrapper.find(HeaderRange).exists(), "has <HeaderRange />");
//   });

//   it("sets central cell colSpan to 5 if `width` 7", () => {
//     const wrapper = shallow(
//       <Header
//         title="any text"
//         hasNextPage
//         hasPrevPage
//         displayWeeks
//         width="7"
//         onNextPageBtnClick={() => {}}
//         onPrevPageBtnClick={() => {}}
//       />
//     );
//     assert.equal(
//       wrapper
//         .find(Table.HeaderCell)
//         .at(1)
//         .prop("colSpan"),
//       (7 - 2).toString(),
//       "central cell colSpan === (7 - 2)"
//     );
//   });

//   it("sets central cell colSpan to 2 if `width` 4", () => {
//     const wrapper = shallow(
//       <Header
//         title="any text"
//         hasNextPage
//         hasPrevPage
//         displayWeeks
//         width="4"
//         onNextPageBtnClick={() => {}}
//         onPrevPageBtnClick={() => {}}
//       />
//     );
//     assert.equal(
//       wrapper
//         .find(Table.HeaderCell)
//         .at(1)
//         .prop("colSpan"),
//       (4 - 2).toString(),
//       "central cell colSpan === (4 - 2)"
//     );
//   });

//   it("sets central cell colSpan to 1 if `width` 3", () => {
//     const wrapper = shallow(
//       <Header
//         title="any text"
//         hasNextPage
//         hasPrevPage
//         displayWeeks
//         width="3"
//         onNextPageBtnClick={() => {}}
//         onPrevPageBtnClick={() => {}}
//       />
//     );
//     assert.equal(
//       wrapper
//         .find(Table.HeaderCell)
//         .at(1)
//         .prop("colSpan"),
//       (3 - 2).toString(),
//       "central cell colSpan === (3 - 2)"
//     );
//   });

//   it("calls onPrevPageBtnClick", () => {
//     const onPrevPageBtnClick = sinon.fake();
//     const onNextPageBtnClick = sinon.fake();
//     const wrapper = shallow(
//       <Header
//         title="title"
//         hasNextPage
//         hasPrevPage
//         displayWeeks
//         width="7"
//         onNextPageBtnClick={onNextPageBtnClick}
//         onPrevPageBtnClick={onPrevPageBtnClick}
//       />
//     );
//     const prevBtn = wrapper.find(Icon).first();
//     prevBtn.simulate("click");
//     assert(onPrevPageBtnClick.calledOnce, "onPrevPageBtnClick is called");
//   });

//   it("calls onNextPageBtnClick", () => {
//     const onPrevPageBtnClick = sinon.fake();
//     const onNextPageBtnClick = sinon.fake();
//     const wrapper = shallow(
//       <Header
//         title="title"
//         hasNextPage
//         hasPrevPage
//         displayWeeks
//         width="7"
//         onNextPageBtnClick={onNextPageBtnClick}
//         onPrevPageBtnClick={onPrevPageBtnClick}
//       />
//     );
//     const nextBtn = wrapper.find(Icon).last();
//     nextBtn.simulate("click");
//     assert(onNextPageBtnClick.calledOnce, "onNextPageBtnClick is called");
//   });

//   it("does not call onNextPageBtnClick if it has not next page", () => {
//     const onPrevPageBtnClick = sinon.fake();
//     const onNextPageBtnClick = sinon.fake();
//     const wrapper = shallow(
//       <Header
//         title="title"
//         hasNextPage={false}
//         hasPrevPage
//         displayWeeks
//         width="7"
//         onNextPageBtnClick={onNextPageBtnClick}
//         onPrevPageBtnClick={onPrevPageBtnClick}
//       />
//     );
//     const nextBtn = wrapper.find(Icon).last();
//     nextBtn.simulate("click");
//     assert(onNextPageBtnClick.notCalled, "onNextPageBtnClick is not called");
//   });

//   it("does not call onPrevPageBtnClick if it has not previous page", () => {
//     const onPrevPageBtnClick = sinon.fake();
//     const onNextPageBtnClick = sinon.fake();
//     const wrapper = shallow(
//       <Header
//         title="title"
//         hasNextPage
//         hasPrevPage={false}
//         displayWeeks
//         width="7"
//         onNextPageBtnClick={onNextPageBtnClick}
//         onPrevPageBtnClick={onPrevPageBtnClick}
//       />
//     );
//     const prevBtn = wrapper.find(Icon).first();
//     prevBtn.simulate("click");
//     assert(onPrevPageBtnClick.notCalled, "onPrevPageBtnClick is not called");
//   });
// });
