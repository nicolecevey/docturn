import { Link, useHistory } from "react-router-dom";
import "./SideBar.scss";
import logoutIcon from "../../assets/icons/logout.svg";
import { useAuth } from "../../Contexts/AuthContext";
import { useState } from "react";

function SideBar({ menuOpen, setMenuOpen }) {
  const {currentUser,logout} = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  async function handleLogout() {
    try {
      await logout()
      history.push("/")
      toggleMenu()
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <nav className={"sidebar " + (menuOpen && "active")}>
      <ul className="sidebar__links">
        <li className="sidebar__list-item" onClick={() => toggleMenu()}>
          <Link className="sidebar__link" to="/">
            Home
          </Link>
        </li>
        <li className="sidebar__list-item" onClick={() => toggleMenu()}>
          <Link to="/documents" className="sidebar__link">
            Documents
          </Link>
        </li>
        <li className="sidebar__list-item" onClick={() => toggleMenu()}>
          <Link to="/documents/add" className="sidebar__link">
            Add Document
          </Link>
        </li>
      </ul>
      <div className="sidebar__logout">
        <img src={logoutIcon} className="sidebar__logout-icon"></img>
        <Link
          to="/"
          className="sidebar__link sidebar__link--logout"
          onClick={() => handleLogout()}
        >
          Logout
        </Link>
        {error && <p className="error">{error}</p>}
      </div>
    </nav>
  );
}

export default SideBar;
