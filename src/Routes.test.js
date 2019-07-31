import React from 'react';
import Routes from './Routes';
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";

it('renders without crashing using shallow', () => {
  shallow(<Routes />)
});

// it('renders without crashing using mount', () => {
//   mount(<Routes />)
// });

// it("matches snapshot", function () {
//   let wrapper = shallow(<Routes />);
//   let serialized = toJson(wrapper);
//   expect(serialized).toMatchSnapshot();
// });