import "./PageNavigation.scss";
import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";

function PageNavigation({menuOpen, setMenuOpen}) {
    return (
        <nav className={"navbar " + (menuOpen && "active")}>
            <NavLink to="/">
                <h1 className="navbar__logo">DocTurn</h1>
            </NavLink>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span className="hamburger--line1"></span>
                <span className="hamburger--line2"></span>
                <span className="hamburger--line3"></span>
            </div>
        </nav>
    )
}

export default PageNavigation;