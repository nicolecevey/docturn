import "./PageNavigation.scss";
import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";

function PageNavigation({menuOpen, setMenuOpen}) {
    return (
        <nav className={"nav " + (menuOpen && "active")}>
            <NavLink to="/">
                <h1 className="nav__logo">DocTurn</h1>
                {/* <img 
                    src={logo} 
                    alt="DocTurn logo with document icon"
                    className="nav__logo"
                ></img> */}
            </NavLink>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span className="hamburger--line1"></span>
                <span className="hamburger--line2"></span>
                <span className="hamburger--line3"></span>
            </div>
            {/* <div className="nav__links">
                <NavLink to={"/"}>
                    <p className="nav__link">Signup</p>
                </NavLink>
                <NavLink to={"/"}>
                    <p className="nav__link">Login</p>
                </NavLink> 
            </div> */}
        </nav>
    )
}

export default PageNavigation;