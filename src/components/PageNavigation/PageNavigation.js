import "./PageNavigation.scss";
import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";

function PageNavigation() {
    return (
        <nav className="nav">
            <NavLink to="/">
                <img 
                    src={logo} 
                    alt="DocTurn logo with document icon"
                    className="nav__logo"
                ></img>
            </NavLink>
            <div className="nav__links">
                <NavLink to={"/"}>
                    <p className="nav__link">Signup</p>
                </NavLink>
                <NavLink to={"/"}>
                    <p className="nav__link">Login</p>
                </NavLink>
            </div>
        </nav>
    )
}

export default PageNavigation;