import React from 'react';
import Nav from './Nav';
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing using shallow', () => {
  shallow(<Nav />)
});

it('renders without crashing using mount', () => {
  mount(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  )
});

it("matches snapshot", function () {
  let wrapper = shallow(<Nav />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("should log in button when no user is logged in", function () {
  let wrapper = mount(
    <MemoryRouter>
      <Nav loggedIn={false} />
    </MemoryRouter>
  );

  expect(wrapper.html()).toContain("Login");
  expect(wrapper.html()).not.toContain("Logout");

});

it("should log out button when user is logged in", function () {
  let wrapper = mount(
    <MemoryRouter>
      <Nav loggedIn={true} />
    </MemoryRouter>
  );

  expect(wrapper.html()).not.toContain("Login");
  expect(wrapper.html()).toContain("Logout");
});