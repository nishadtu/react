
import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav style={{display: "none"}}>
        <NavMenu basename="/2022/react">
          <NavLink to="/2022/react/" >
            Leaderboard
          </NavLink>
          <NavLink to="/2022/react/score" >
          Score
          </NavLink>
          <NavLink to="/2022/react/blogs" >
            Blogs
          </NavLink>
          <NavLink to="/2022/react/sign-up" >
            Sign Up
          </NavLink>
          <NavLink to="/2022/react/registration" >
            Register
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
