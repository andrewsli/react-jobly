import React from 'react';
import Nav from './Nav';
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing using shallow', () => {
  shallow(<Nav />)
});

it('renders without crashing using mount', () => {
  mount(<Nav />)
});

it("matches snapshot", function () {
  let wrapper = shallow(<Nav />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

// it("should go to home page when the logo is clicked",
//   function () {
//     const wrapper = mount(
//     <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout"]}
//     initialIndex={1}>
//       <Nav />
//     </MemoryRouter>);

//     wrapper
//       .find('button[name="home"]')
//       .simulate("click");

//       expect(wrapper.find("Home")).toHaveLength(1);
//   });

// it("should go to the companies page when the companies tab is clicked",
//   function () {
//     const wrapper = mount(
//     <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout"]}
//     initialIndex={0}>
//       <Nav />
//     </MemoryRouter>);

//     wrapper
//       .find('button[name="companies"]')
//       .simulate("click");
    
//     expect(wrapper.find("Companies")).toHaveLength(1);
//   });

// it("should go to the jobs page when the jobs tab is clicked",
//   function () {
//     const wrapper = mount(
//     <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout"]}
//     initialIndex={0}>
//       <Nav />
//     </MemoryRouter>);

//     wrapper
//       .find('button[name="jobs"]')
//       .simulate("click");

//     expect(wrapper.find("Jobs")).toHaveLength(1);
//   });

// it("should go to the profile page when the profile tab is clicked",
//   function () {
//     const wrapper = mount(
//     <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout"]}
//     initialIndex={0}>
//       <Nav />
//     </MemoryRouter>);

//     wrapper
//       .find('button[name="profile"]')
//       .simulate("click");
    
//     expect(wrapper.find("Profile")).toHaveLength(1);
//   });

// it("should log out when the log out button is clicked",
//   function () {
//     const wrapper = mount(
//     <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout"]}
//     initialIndex={0}>
//       <Nav />
//     </MemoryRouter>);

//     wrapper
//       .find('button[name="logout"]')
//       .simulate("click");

//     expect(wrapper.find("Home")).toHaveLength(1);
//   });

// it("should show the log in form when the log in button is clicked",
//   function () {
//     const wrapper = mount(
//     <MemoryRouter initialEntries={["/", "/companies", "/jobs", "/profile", "/login", "/logout"]}
//     initialIndex={0}>
//       <Nav />
//     </MemoryRouter>);

//     wrapper
//       .find('button[name="logout"]')
//       .simulate("click");

//     expect(wrapper.find("Login")).toHaveLength(1);
//   });

// it("should log in button when no user is logged in", function () {

// });

// it("should log out button when user is logged in", function () {

// });