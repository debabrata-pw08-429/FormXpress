import { NavLink } from "react-router-dom";
import "./navbarModule.css";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <h1>FormXpress</h1>
        <nav className="nav_sub">
          <NavLink
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
          </NavLink>
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
