import { NavLink } from "react-router-dom";
import "./navbarModule.css";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <div onClick={() => (window.location.href = "/")}>
          <img src={Logo} alt="logo" className="logo-nav" />
          <h1>FormXpress</h1>
        </div>

        <nav className="nav_sub">
          <NavLink
            to="https://github.com/debabrata-pw08-429/FormXpress"
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
            <img
              src="https://img.icons8.com/?size=512&id=62856&format=png"
              className="nav-img"
            />
          </NavLink>
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
