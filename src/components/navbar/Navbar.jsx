import { NavLink } from "react-router-dom";
import "./navbarModule.css";
import { SiFormstack } from "react-icons/Si";
import { BsGithub } from "react-icons/Bs";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <div onClick={() => (window.location.href = "/")}>
          <SiFormstack className="logo-nav" />
          <h1>FormXpress</h1>
        </div>

        <nav className="nav_sub">
          <NavLink
            to="https://github.com/debabrata-pw08-429"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                borderRadius: isActive ? "8px" : "",
                color: isActive ? "white" : "",
                padding: isActive ? "8px" : "",
                fontSize: "30px",
              };
            }}
            target="_blank"
          >
            <BsGithub />
          </NavLink>

          {/* ----------------EDIT:NAV------------> */}
          {/* <NavLink
            to="/edit"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                border: isActive ? "3px solid white" : "",
                borderRadius: isActive ? "8px" : "",
                color: isActive ? "white" : "",
                padding: isActive ? "8px" : "",
              };
            }}
          >
            Editor
          </NavLink>
          <NavLink
            to="/preview"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                border: isActive ? "3px solid white" : "",
                borderRadius: isActive ? "8px" : "",
                color: isActive ? "white" : "",
                padding: isActive ? "8px" : "",
              };
            }}
          >
            Viewform
          </NavLink>
          <NavLink
            to="/responses"
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                border: isActive ? "3px solid white" : "",
                borderRadius: isActive ? "8px" : "",
                color: isActive ? "white" : "",
                padding: isActive ? "8px" : "",
              };
            }}
          >
            Responses
          </NavLink> */}
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
