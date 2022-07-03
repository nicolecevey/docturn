import { Link } from "react-router-dom";
import "./SideBar.scss";
import logoutIcon from "../../assets/icons/logout.svg";

function SideBar({ menuOpen, setMenuOpen }) {
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={"sidebar " + (menuOpen && "active")}>
      <ul className="sidebar__links">
        <li className="sidebar__list-item" onClick={() => toggleMenu()}>
          <Link className="sidebar__link" to="/">
            Home
          </Link>
        </li>
        <li className="sidebar__list-item" onClick={() => toggleMenu()}>
          <Link to="/documents/add" className="sidebar__link">
            Add Document
          </Link>
        </li>
        <li className="sidebar__list-item" onClick={() => toggleMenu()}>
          Contact
        </li>
        {/* <li className="sidebar__list-item sidebar__list-item--signout" onClick={() => toggleMenu()}>
                </li> */}
      </ul>
      <div className="sidebar__logout">
        <img src={logoutIcon} className="sidebar__logout-icon"></img>
        <Link
          to="/"
          className="sidebar__link sidebar__link--logout"
          onClick={() => toggleMenu()}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default SideBar;
