import "./LoginForm.scss";
import { Link } from "react-router-dom";

function LoginForm(){

    return(
        <form className="login-form">
            <h1 className="login-form__title">Login</h1>
            <input className="login-form__input" placeholder="Username"></input>
            <input className="login-form__input" placeholder="Password"></input>
            <button type="submit" className="login-form__button">Login</button>
            <div className="login-form__signup">
                <p>New to DocTurn?</p>
                <Link className="login-form__link">Signup</Link>
        </div>
        </form>

    )
}

export default LoginForm;